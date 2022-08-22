/**
 * 示例：抓取列表
 */
module.exports = {

    onCrawled($bat){
      console.log( 'sample.onCrawled', $bat.threads );
    },

    sources : require('./sources'),

}