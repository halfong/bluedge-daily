/**
 * 创建为公众号草稿
 * @param {*} $bat 
 */
const AeWxmp = require('../../lib/AeWemp');
const wemp = new AeWxmp( 'wx14401f2b01127b62', 'a8130a82c9d7e568cfa2559a4b96f6f1' );
var moment = require('moment')
const makeHtml = require('./template');
const { format } = require('date-and-time');

async function onCrawled($bat){
  const [ sdate, edate ] = $bat.args

  $bat.unique('title');
  $bat.dateBetween( sdate , edate );

  const html = makeHtml( $bat.threads );
  const wxmp_post = await wemp.createDrafts([
      {
          "title": `旅游行业周报${ moment(sdate).subtract( 1, 'days').format('-M月dd日') }`,
          "thumb_media_id": 'y7qsf3-t-unAtMuVqdgoTbhd6QmSHt54vyHhQkDR7zm28bV7UUrQhVYNA81--any',
          "author": 'Alex阿乐',
          "digest": $bat.threads[0].title + '：'+$bat.threads[0].teaser,
          "show_cover_pic": true,
          "content": html,
      },
  ]);
  console.log( '公众号图文已创建', wxmp_post );
}

module.exports = {
  onCrawled : onCrawled,
  sources : require('./sources'),
}