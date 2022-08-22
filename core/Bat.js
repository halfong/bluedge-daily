const aecrawl = require('ae-crawler');
const moment = require('moment');
const util = require('./util');

module.exports = class Bat{

  threads = []

  onCrawled = async $bat => console.log('onCrawled')
  sources = []

  constructor({ onCrawled = null, sources = null }){
    if(onCrawled) this.onCrawled = onCrawled
    if(sources) this.sources = sources
    return this;
  }

  async crawl( verbose = false ){
    for( let src of this.sources ){
      const result = await aecrawl( src, verbose );
      this.threads = this.threads.concat( result );
    }
    this.__format();
    console.log(`crawl:已抓取${this.threads.length}条`);
    this.onCrawled && await this.onCrawled(this);
  }

  __format(){
    this.threads = this.threads.sort( (a,b)=> b.date - a.date )
    this.threads.forEach( _th => {
      _th.crawled_at = new Date()
      _th.date = util.reDate( _th.date, _th.crawled_at )  //从human时间恢复为date
      Object.keys( _th ).forEach( _k => {
        if( typeof _th[_k] == 'string' ) _th[_k] = util.trimS( _th[_k] )
      })
    })
  }

  saveFile( saveAs ){
    console.log('还未实现')
    return this;
  }

  dateBetween( sdate, edate ){
    this.threads = this.threads.filter( i => moment(i.date).isBetween( sdate, edate ) );
    console.log(`filter.between:${sdate}(含)至${edate} 剩余：${this.threads.length}条`);
    return this;
  }

  unique( k ){
    this.threads = util.arrayObject.unique( this.threads, k );
    console.log(`filter.unique:${k} 剩余：${this.threads.length}条`);
    return this;
  }

}