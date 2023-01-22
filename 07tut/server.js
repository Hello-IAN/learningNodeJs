const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;


// custom middleware logger
app.use(logger);

//Cross Origin ResourceSharing
//오리진 비교 함수 만들기.
//조건에 맞아도 origin undefined면 거절당함

const whitelist = ['https://www.google.co.kr', 'http://127.0.0.1:5500', 'http://localhost:3500']
const corsOptions = {
	origin: (origin, callback) => {
		if (whitelist.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error('Not allowd by CORS'));
		}
	},
	optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

/* built-in middleware to handle urlencoded data
in other words, form data:
'content-type: application/x-www-form-urlencoded' 
폼데이타 같은거 날라오면 그대로 받음
*/
/* 모든 라우터에 미들웨어 적용 */
app.use(express.urlencoded({ extended: false}));

// built-in middleware for json
app.use(express.json());

//serve static files, 이미지나, css같은 것들
//이거안하면..CSS벗겨져서 날아가는거 확인가능
app.use(express.static(path.join(__dirname, '/public')));

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
//app.use('/')는 REGEX허락 안해줌
//그래서 모든요청에 대해서 리젝 걸어놔야함.
app.all('*', (req, res) => {
	res.status(404);
	//return true or false
	if (req.accepts('html')) {
		res.sendFile(path.join(__dirname, 'views', '404.html'));
	} else if (req.accepts('json')) {
		res.json({ error: "404 Not Found"})
	} else {
		res.type('txt').send("404 Not Found");
	}
}) 

app.use(errorHandler);

/* add a listen */
app.listen(PORT, () => {
	console.log(`Server running on ${PORT}`)
});