const fetchLinks = require('./server/fetch_links');
const fetchContent = require('./server/fetch_content');
const urls = require('./util/urls');
const express = require('express');
const app = express();
const opn = require('opn');
const PORT = 3000;

let pageNum = 1;
let _urls = urls(pageNum);
/*
 初始化app
 */
function init() {
	fetchLinks(_urls)
		.then((result)=> {
			return fetchContent(result);
		})
		.then((result)=> {
			app.use(express.static('./views'));
			app.use('/job',express.static('./views/index.html'));

			app.get('/data', (req, res)=> {
				res.header("Access-Control-Allow-Origin", req.headers.origin);
				res.json(result);
			});

			app.listen(PORT, ()=> {
				console.log('Start listening port : ' + PORT);
				console.log('\n正在生成地图...\n');
				opn('http://localhost:3000/job')
					.then(()=> {
						console.log('网页成功打开 !');
					})
					.catch((err)=> {
						console.log('网页打开失败, 错误信息: ' + err);
					});
			});

		})
		.catch((err)=> {
			console.error(err);
		})
}

init();