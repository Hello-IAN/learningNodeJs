const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;


// custom middleware logger
app.use(logger);

//Cross Origin ResourceSharing
//오리진 비교 함수 만들기.
//조건에 맞아도 origin undefined면 거절당함

app.use(cors(corsOptions));

/* built-in middleware to handle urlencoded data form data:
/* 모든 라우터에 미들웨어 적용 */
app.use(express.urlencoded({ extended: false}));

// built-in middleware for json
app.use(express.json());

//serve static files, 이미지나, css같은 것들
app.use('/', express.static(path.join(__dirname, '/public')));

//using api
app.use('/employees', require('./routes/api/employees'));

//add router
app.use('/', require('./routes/root'));



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