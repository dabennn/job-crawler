const async = require('async');
const fetch = require('../util/fetch');
const content = require('../util/content');
/***************
 params:
 limit --> 并发数
 ****************/
let limit = 5;
/*
 并发爬取每个职位的具体信息
 */
module.exports = (links)=> {
	return new Promise((resolve,reject)=>{
		async.mapLimit(links, limit, (item, cb)=> {
			fetch(item, cb, content);
		}, (err, results)=> {
			if (err) {
				console.error(err);
				reject(err);
			}
			console.log('\n职位信息爬取成功...\n');
			resolve(results);
		});

	});

}
