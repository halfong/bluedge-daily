const util = require('./util');

module.exports = function format( items ){
  return items.map( item => {
      item.title = util.trimS( item.title )
      item.teaser = util.trimS( item.teaser )
      item.crawled_at = new Date()
      item.date = util.reDate( item.date, item.crawled_at )
      return item
  })
}