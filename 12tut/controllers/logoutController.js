const usersDB = {
	users: require('../model/users.json'),
	setUsers: function (data) {
		this.users = data
	}	
}
/* DB달때까지만..이렇게 씀 */

const fsPromises = require('fs').promises;
const path = require('path');

const handleLogout = async (req, res) => {
	// On client, also delete the accessToken
	// 로그아웃 버튼 누르면 0을 넣든 공백을 넣든 해서 날릴 수 있게

	const cookies = req.cookies
	if (!cookies?.jwt) return res.sendStatus(204); //No Content
	const refreshToken = cookies.jwt;

	// Is refreshToken in db?

	const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
	if (!foundUser) {
		res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
		return res.sendStatus(204)
	};
	
	// Dlete RefreshToken in DB
	const otherUsers = usersDB.users.filter(person => person.refreshToken != foundUser.refreshToken);
	const currentUser = {...foundUser, refreshToken: ''};
	usersDB.setUsers([...otherUsers, currentUser]);
	await fsPromises.writeFile(
		path.join(__dirname, '..', 'model', 'users.json'),
		JSON.stringify(usersDB.users)
	);
	//production level의 app에서는 secure:true도 꼭 해줘야함 -only serves on https
	res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
	res.sendStatus(204);
}

module.exports = { handleLogout };
