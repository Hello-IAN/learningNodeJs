const usersDB = {
	users: require('../model/users.json'),
	setUsers: function (data) {
		this.users = data
	}	
}
const bcrypt = require('bcrypt');

const handleLogin = async (req, res) => {
	const { user, pwd } = req.body;
	if (!user || !pwd) return res.status(400).json({ 'message' : 'Username and password are required. '});
	const foundUser = usersDB.users.find(person => person.username === user);
	if (!foundUser) return (res.sendStatus(401)); //Unathorized
	//evaluate password
	const match = await bcrypt.compare(pwd, foundUser.password);
	if (match) {
		//create JWT를 다음 강의에서 배울 것
		//Access && refresh
		res.json({ 'success': `user ${user} is logged in` });
	} else {
		res.sendStatus(401);
	}
}

module.exports = { handleLogin };
