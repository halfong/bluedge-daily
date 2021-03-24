const util = require('./util');

module.exports = function filter( threads ){
  
  //过滤：仅限昨日内更新
  const today = util.getEve()
  const yesterday = util.getEve(-1)
  threads = threads.filter( i => i.date < today && i.date >= yesterday )
  console.log(`过滤后${threads.length}条`, `（时间${today}至${yesterday}）` )

  //过滤：本日内post.title不重复
  threads = util.arrayObject.unique( threads, 'title' )
  console.log(`过滤后${threads.length}条`,`（title排重过滤后）`)

  //@todo 过滤：去除库昨日的post中已存在的threads
  // const yesterItems = await postGhost.getItems( util.formatDate( yesterday, 'daily-$Y-$M-$dd' ) )
  // const yeaterTitles = yesterItems.map(i => i.title)
  // threads = threads.filter( i => yeaterTitles.indexOf( i.title ) < 0 )
  // console.log(`对比昨日排重过滤后：${threads.length}条`)

  return threads

}