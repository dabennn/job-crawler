// const urls = require('../util/urls');
const fetch = require('../util/fetch');
const hrefs = require('../util/hrefs');
const async = require('async');
/*************************
 params:
 limit --> 并发数
 links --> 包含所有职位链接的数组
 pageNum --> 爬取的列表页数(e.g.5表示爬取第1-5页)
 ***************************/
let limit = 5;
let links = [];
/*
 并发爬取职位列表页面，获取每个职位信息的具体链接
 */
module.exports = (urls)=>{
	return new Promise((resolve,reject)=>{
		async.mapLimit(urls, limit, (item, cb)=> {
			fetch(item, cb, hrefs);
		}, (err, results)=> {
			if (err) {
				reject(err);
			}
			console.log('\n职位链接爬取成功，开始爬取职位信息...\n');

			results.forEach((item)=> {
				links = links.concat(item);
			})
			resolve(links);
		})

	})

}
