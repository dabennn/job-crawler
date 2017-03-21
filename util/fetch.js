const superagent = require('superagent');

/****************
 请求url,设置user-agent头模仿浏览器访问
 *******************/
let count = 0;
module.exports = (url, cb, handler)=> {
	let delay = Math.floor((Math.random() * 3000));
	count++;
	console.log(`当前并发数: ${count}, 正在爬取: ${url}, 延时: ${delay} ms`);
	superagent
		.get(url)
		.set({'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'})
		.end((err, res)=> {
			if (err) {
				console.log('有一条数据没有获取到');
				console.error(err);
			} else {
				setTimeout(()=> {
					count--;
					let result = handler(res.text, url);
					cb(null, result);
				}, delay);
			}
		});
}
