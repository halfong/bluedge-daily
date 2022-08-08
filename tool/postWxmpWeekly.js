const GhostAdminAPI = require('@tryghost/admin-api');
const date = require('date-and-time')
const env = {
  "ghost" : {
    "url": "https://bjlx.top",
    "key": "605b58f30e68faaa0bd07eca:22f558df012b6709b183948fecac3e56a5417d04add60cc7737255d6fa820b64",
    "version": "v3",
    "author":"hi@anedge.tech",
  }
};

var arguments = process.argv;
var sdate = new Date( arguments[2] );


(async ()=>{
  const api = new GhostAdminAPI({
    url : env.ghost.url,
    key : env.ghost.key,
    version : env.ghost.version,
  });

  const slugs = [];
  for( let n = 7; n > 0; n --){
    slugs.push( date.format( sdate, 'daily-YYYY-M-DD' ) );
    sdate = date.addDays( sdate, 1 );
  }

  console.log(slugs);

  for( let i in slugs ){
    const posts = await api.posts.read({ slug : slugs[i] }).catch(e=>console.log('获取失败'+slugs[i]));
    console.log( posts );
  }

  process.exit(0);
})();