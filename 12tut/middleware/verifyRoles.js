//말그대로 허락된 권한인지 체크

const verifyRoles = (...allowedRoles) => {
	return (req , res, next) => {
		if (!req?.roles) return res.sendStatus(401);
		const rolesArr = [...allowedRoles];
		console.log(rolesArr);
		console.log(req.roles);
		//jwt로 정의한 req의 roles가 허용된 role인지 true or false 줄꺼임
		const result = req.roles.map(role => rolesArr.includes(role)).find(val => val === true);
		if (!result) return res.sendStatus(401);
		next();
	}
}

module.exports = verifyRoles