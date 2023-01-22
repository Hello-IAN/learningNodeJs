const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;

/* mathing method req */
/* 보낼 파일 path, 시작점 지정 */
/* 익스프레스를 쓰면 좋은 점이 라우팅에서 REGEX를 쓸수있음 */
app.get('^/$|/index(.html)?', (req, res) => {
	//res.sendFile('./views/index.html', { root: __dirname });
	res.sendFile(path.join(__dirname, 'views', 'index.html'));
	
});

app.get('/new-page(.html)?', (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'new-page.html'));

});

/* 리다렉션, .redirect(리다렉할 라우트) */
/* 302가 기본값인데 302는 서치엔진이 리다렉하는데 필요하지 않음 */
/* 그래서 301줌 */
app.get('/old-page(.html)?', (req, res) => {
	res.redirect(301, '/new-page.html'); //302 by default

});

// Route Handlers
// 실패 -> 다음 펑션 콜
/* app.get('/hello(.html)?', (req, res, next) => {
	console.log('attmpted to load hello.html')
	next()
}, (req, res) => {
	res.send('hell World');
}); */


// chaining route handlers
const one = (req, res, next) => {
	console.log('one');
	next();
};
const two = (req, res, next) => {
	console.log('two');
	next();
};
const three = (req, res) => {
	console.log('three');
	res.send('finished');
};

app.get('/chain(.html)?', [one, two, three]);

/* 익스프레스는 페이지 못찾으면 404 상태코드를 기본으로 보내줌 */
/* 근데 만든 404페이지 보내고싶으니까 */
app.get('/*', (req, res) => {
	res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
}) 

/* add a listen */
app.listen(PORT, () => {
	console.log(`Server running on ${PORT}`)
});