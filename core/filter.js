const util = require('./util');

/**
 * 
 * @param {Array} threads 
 * @param {Date} sdate 
 * @param {Date} edate 
 * @returns 
 */
module.exports = function filter( threads, sdate, edate ){
  
  threads = threads.filter( i => i.date < edate && i.date >= sdate )
  console.log(`过滤后${threads.length}条`, `（时间${sdate}至${edate}）` )

  //过滤：post.title不重复
  threads = util.arrayObject.unique( threads, 'title' )
  console.log(`过滤后${threads.length}条`,`（title排重过滤后）`)

  //@todo 过滤：去除库昨日的post中已存在的threads
  // const yesterItems = await postGhost.getItems( util.formatDate( yesterday, 'daily-$Y-$M-$dd' ) )
  // const yeaterTitles = yesterItems.map(i => i.title)
  // threads = threads.filter( i => yeaterTitles.indexOf( i.title ) < 0 )
  // console.log(`对比昨日排重过滤后：${threads.length}条`)

  return threads

}