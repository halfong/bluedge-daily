/**
 * 旅业周报
 * - 抓取tasks源
 * - 发表到公众号：边界旅行 草稿箱
 */
const aecrawl = require('ae-crawler');
const tasks = require('./tasks');

const format = require('../core/format');
const filter = require('../core/filter');
const util = require('../core/util');
const postGhost = require('../core/postGhost');
const postWxmp = require('../core/postWxmp');

console.log(process.argv);

if( !process.argv[2] || !process.argv[2] ) process.exit(401);
const sdate = new Date( process.argv[2] );
const edate = new Date( process.argv[3] );

(async ()=>{

  // 抓取
  var threads = [];
  for( let t of tasks ){
    const result = await aecrawl( t, true );
    threads = threads.concat( result );
  }
  console.log(`已抓取${threads.length}条`);
  // 格式化
  threads = format( threads );
  // 过滤
  threads = filter( threads, sdate, edate );
  //时间排序
  threads = threads.sort( (a,b)=> b.date - a.date )

  
  /**
   * 发布(创建)
   */
  const today = util.getEve()
  const article = {
      title : `旅游行业周报【请填写】`,
      slug : util.formatDate( edate, 'daily-$Y-$M-$dd' ),
      threads : threads
  }

  // 创建到微信公众号
  const html = require('./template')( article ).replace(/\r\s+|\n\s+|\r|\n/g,'');
  // console.log( html );
  const wxmp_post = await postWxmp.create( article.title, html )
  console.log( '公众号图文已创建', wxmp_post )
  
  process.exit(0);
})();