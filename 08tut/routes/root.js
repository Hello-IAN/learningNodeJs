const express = require('express');
const router = express.Router();
const path = require('path');


/* mathing method req */
/* 보낼 파일 path, 시작점 지정 */
/* 익스프레스를 쓰면 좋은 점이 라우팅에서 REGEX를 쓸수있음 */
router.get('^/$|/index(.html)?', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
	
});

router.get('/new-page(.html)?', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'views', 'new-page.html'));

});

/* 리다렉션, .redirect(리다렉할 라우트) */
/* 302가 기본값인데 302는 서치엔진이 리다렉하는데 필요하지 않음 */
/* 그래서 301줌 */
router.get('/old-page(.html)?', (req, res) => {
	res.redirect(301, '/new-page.html'); //302 by default

});

module.exports = router;
