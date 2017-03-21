/*
 根据url的规律生成要爬取的url数组
 */

module.exports = (num)=> {
	let urls = [];
	let url = (page)=> {
		return `https://www.lagou.com/zhaopin/qianduankaifa/${page}/?filterOption=3`;
	};
	for (let i = 0; i < num; i++) {
		urls.push(url(i + 1));
	}
	return urls;
}