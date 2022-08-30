const moment = require('moment');
      moment.locale('zh-cn');

const task = require(`./${ process.argv[2] }`);
const args = process.argv.slice( 3 );

(async ()=>{
  await task( args );
  process.exit(0);
})();