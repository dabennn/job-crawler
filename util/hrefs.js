const cheerio = require('cheerio');
const unique = require('./unique');
/*
 处理职位列表页面，获取每页的所有具体职位链接，并去重
 */
module.exports = (html)=> {
	let hrefs = [];
	let $ = cheerio.load(html);
	$('a.position_link').each(function () {
		hrefs.push($(this).attr('href'));
	});
	return unique(hrefs);
}