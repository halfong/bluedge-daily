const { Tecrawl } = require('tecrawl');
const moment = require('moment');

const wemp = require('../core/wemp');
const makeHtml = require('./template');
const sources = require('./sources');

module.exports = async function( args ){

  const $tec = new Tecrawl( sources );
  const [ sdate, edate ] = args


  
  await $tec.crawl();
  if( $tec.threads.length == 0 ) return console.log('没有可用数据');
  $tec.unique('title');
  $tec.dateBetween( sdate , edate );
  console.log( $tec.threads );


  const html = makeHtml( $tec.threads );
  const wxmp_post = await wemp.createDrafts([
      {
          "title": `旅业周报-${ moment(edate).format('M月DD日') }`,
          "thumb_media_id": 'y7qsf3-t-unAtMuVqdgoTbhd6QmSHt54vyHhQkDR7zm28bV7UUrQhVYNA81--any',
          "author": 'Alex阿乐',
          "digest": $tec.threads[0].title + '：'+$tec.threads[0].teaser,
          "show_cover_pic": true,
          "content": html,
      },
  ]);
  console.log( '公众号图文已创建', wxmp_post );
}