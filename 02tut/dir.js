const fs = require('fs');

//디렉토리 만들기
fs.mkdir('.new', (err) => {
	if (err) throw err;

})

//있는지 체크하고 만들기

if (!fs.existsSync('./new')) {
	fs.mkdir('.new', (err) => {
		if (err) throw err;
	
	})	
}
//rmdir도 있음
