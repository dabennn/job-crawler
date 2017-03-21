const cheerio = require('cheerio');

/**************
 处理页面，获取job具体信息
 info = {
	 link:'',
	 company:'',
	 jobRequest:'',
	 time:'',
	 addr:''
 };
 ***************/

module.exports = (html, link)=> {
	let info = {};
	let $ = cheerio.load(html);
	info.link = link;
	info.company = $($('div.company')[0]).text();
	info.jobRequest = $($('dd.job_request>p')[0]).text().replace(/\s/g, '');
	info.time = $($('dd.job_request p')[1]).text().replace(/发布于拉勾网/, '').trim();
	info.addr = $($('div.work_addr')[0]).text().replace(/\s/g, '').replace(/查看地图/, '').replace(/\-/g, '');

	return info;
}