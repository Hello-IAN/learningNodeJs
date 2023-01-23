const usersDB = {
	users: require('../model/users.json'),
	setUsers: function (data) {
		this.users = data
	}	
}
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
require('dotenv').config();
const fsPromises = require('fs').promises;
const path = require('path');

const handleLogin = async (req, res) => {
	const { user, pwd } = req.body;
	if (!user || !pwd) return res.status(400).json({ 'message' : 'Username and password are required. '});
	const foundUser = usersDB.users.find(person => person.username === user);
	if (!foundUser) return (res.sendStatus(401)); //Unathorized
	//evaluate password
	const match = await bcrypt.compare(pwd, foundUser.password);
	if (match) {
		const roles = Object.values(foundUser.roles).filter(Boolean);
		//create JWT를 다음 강의에서 배울 것
		//기본적으로 유저네임을 넣는다.(보안이슈)
		//payload에 user로드, 액세스토큰, 옵션밸류(익스파이어..?)
		//프로덕션레벨이면 5분정도가 될수도있음.
		//메모리에 올라가고, roles로도 감싸져 의미가 있어서 찾기 쉽지않음
		//리프레시는 그냥 말그대로 뉴 액세스 재발급용
		const accessToken = jwt.sign(
			{ 
				"UserInfo": {
					"username": foundUser.username,
					"roles": roles
				}
			},
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: '30s' }
		);
		const refreshToken = jwt.sign(
			{ "username": foundUser.username },
			process.env.REFRESH_TOKEN_SECRET,
			{ expiresIn: '1d' }
		);
		//간단한 작업, 리프레시를 디비에 저장하기위한 작업
		const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username);
		const currentUser = { ...foundUser, refreshToken };
		usersDB.setUsers([...otherUsers, currentUser]);
		await fsPromises.writeFile (
			path.join(__dirname, '..', 'model', 'users.json'),
			JSON.stringify(usersDB.users)
		);
		//프론트, 풀스택디벨로퍼면 그냥 메모리에 들고있게끔 하고싶을거임.
		//이것이 딜레마.. 리프레시토큰은 어따 저장하고 싶을거임..
		//자바스크립트로 이용할 수 없지만, httpsOnly로 보내서 쿠키에 박는게 최선..
		//리퀘스트마다 왔다갔다하게...로컬에다 저장하는 것보단 나으니까..
		res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
		res.json({ accessToken });
	} else {
		res.sendStatus(401);
	}
}

module.exports = { handleLogin };
