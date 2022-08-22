const moment = require('moment');
      moment.locale('zh-cn');
const Bat = require('./core/Bat');
const task = require(`./tasks/${ process.argv[2] }`);

const $bat = new Bat( task );
$bat.args = process.argv.slice( 3 );

(async ()=>{
  await $bat.crawl();
  process.exit(0);
})();