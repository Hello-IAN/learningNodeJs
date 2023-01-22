const express = require('express');
const router = express.Router();
const path = require('path');


/* mathing method req */
/* 보낼 파일 path, 시작점 지정 */
/* 익스프레스를 쓰면 좋은 점이 라우팅에서 REGEX를 쓸수있음 */
router.get('^/$|/index(.html)?', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
	
});

module.exports = router;
