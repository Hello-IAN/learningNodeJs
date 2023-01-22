//stream 이해
const fs = require('fs');

const rs = fs.createReadStream('./files/lorem.txt', {encoding:'utf8'});

const ws = fs.createWriteStream('files/new-lorem.txt');

//기본 방법
rs.on('data', (dataChunk) => {
	ws.write(dataChunk);
})

//using piping
//rs.pipe(ws)
