const usersDB = {
	users: require('../model/users.json'),
	setUsers: function (data) {
		this.users = data
	}	
}

const fsPromises = require('fs').promises;
const path = require('path');
//install bcrypt
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
	const { user, pwd } = req.body;
	if (!user || !pwd) return res.status(400).json({ 'message' : 'Username and password are required. '});
	// check for duplicate usernames in the db
	// it just simul.
	const duplicate = usersDB.users.find(person => person.username === user);
	if (duplicate) return res.sendStatus(409); //Confilct
	try {
		//encrypt the password
		//determine a hash sort rounds
		//protect a password
		const hashedPwd = await bcrypt.hash(pwd, 10)
		//store the new user
		//Add a Roles
		const newUser = { 
			"username": user, 
			"roles": { "User": 2001 },
			"password": hashedPwd 
		};
		//리액트에서 state쓰는거랑 비슷함
		//변경 불가능한 기존의 어레이 대신
		//새 어레이를 만들어서 넣음
		usersDB.setUsers([...usersDB.users, newUser]);
		await fsPromises.writeFile(
			path.join(__dirname, '..', 'model', 'users.json'),
			JSON.stringify(usersDB.users)
		);
		res.status(201).json({ 'success': `New user ${user} created!` });
	} catch (err) {
		res.status(500).json({ 'message': err.message });
	}
}

module.exports = { handleNewUser };

