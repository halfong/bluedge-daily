/**
 * 旅业日报
 * - 抓取多个网站的文章列表
 */
const aecrawl = require('ae-crawler');
const tasks = require('./tasks');

const format = require('./core/format');
const filter = require('./core/filter');
const util = require('./core/util');
const postGhost = require('./core/postGhost');
const postWxmp = require('./core/postWxmp');

(async ()=>{

  console.time('task-duration');

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
  threads = filter( threads );

  //时间排序
  threads = threads.sort( (a,b)=> b.date - a.date )
  // return console.log(threads)
  /**
   * 发布(创建)
   */
  const today = util.getEve()
  const article = {
      title : `边界旅行日报 | ` + util.formatDate( today, '$M月$d日 星期$wd@zh'),
      slug : util.formatDate( today, 'daily-$Y-$M-$dd' ),
      threads : threads
  }
  // 创建并发布到ghost
  const ghost_post = await postGhost.publish( article.title, article.slug, article.threads )
  console.log( 'Ghost Post已发布', ghost_post.id )

  // 创建到微信公众号
  const wxmp_post = await postWxmp.create( article.title, article.slug, article.threads )
  console.log( '公众号图文已创建', wxmp_post )
  
  console.timeEnd('task-duration');
  process.exit(0);

})();