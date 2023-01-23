const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
	console.log(`authHeader${req.headers.authorization}`);
	console.log(`authHeader${req.headers.Authorization}`);

	const authHeader = req.headers.authorization || req.headers.Authoriztion;
	/* 권한 있거나 또는 없는데 'Bearer'로 시작하면 */
	if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
	console.log(authHeader); 
	const token = authHeader.split(' ')[1];
	jwt.verify(
		token,
		process.env.ACCESS_TOKEN_SECRET,
		(err, decoded) => {
			if (err) return res.sendStatus(403); //invalid token
			req.user = decoded.UserInfo.username;
			req.roles = decoded.UserInfo.roles;
			next();
		}
	);
}

module.exports = verifyJWT