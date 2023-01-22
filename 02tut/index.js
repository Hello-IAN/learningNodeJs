
/* calling filesystem Module */
const fs = require('fs');

/* open and read a file from files */
fs.readFile('./files/starter.txt', 'utf-8', (err, data) => {
	if (err) throw err;
	console.log(data);
})
// you can get a buffer data decorded <Buffer 68 69 20 69 27 like>
// because of it is binary,
// you can choose two way

// first is using '.toString()'
// console.log(data.toString())

// seconde is add encoding option when you read a file
//fs.readFile('./files/starter.txt', 'utf8', (err, data) => {

// exit on uncaught errors
process.on('uncaughtException', err => {
	console.error(`There was an uncaught error: ${err}`);
	process.exit(1);
})

// do change the filename dosn't exist and run node index again
// you can see the err line.

// 실행 순서 차이 lkie async & await
// if your code line like this

/* fs.readFile('./files/starter.txt', 'utf-8', (err, data) => {
	if (err) throw err;
	console.log(data);
})

console.log('hello') */

// the result will be hello first and data
// because of async.

// filePath 관련해서 하드코딩하면 인식 못하는 경우 있음
// 아래처럼 사용함
/* const path = require('path');
fs.readFile(path.join(__dirname, 'files', 'starter.text') */


//write to Files
const path = require('path');
//writeFile(filename, contents, callbackF)
fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'nice to meet you', (err) => {
	if (err) throw err;
	console.log('Write complete');
} )

//updating FIles
fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), '\nnice to meet you too', (err) => {
	if (err) throw err;
	console.log('Append complete');
} )

//좋은 사용 방법 예시
//write는 파일 있든 없든 만들어주니, 그 안에서 작업

/* fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'nice to meet you', (err) => {
	if (err) throw err;
	console.log('Write complete');
	fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), '\nnice to meet you too', (err) => {
		if (err) throw err;
		console.log('Append complete');
		//fs.rename 넣어서 이름 바꿀수도있음
	} )

} ) //굉장히 콜백지옥같음 */
//그래서 프로미스를 부름

const fsPromises = require('fs').promises;

const fileOps = async () => {
	try {
		const data = await fsPromises.readFile(path.join(__dirname, 'files', 'reply.txt'), 'utf8');
		console.log(data);
		//delete link를 해야 파일이 하나 새로 안생기고 바로 리네임하는것처럼 될 수 있음(밑에 리네임 넣으면..)
		await fsPromises.unlink(path.join(__dirname, 'files', 'reply.txt'));
		await fsPromises.writeFile(path.join(__dirname, 'files', 'writePromisesData.txt'), data);
		await fsPromises.appendFile(path.join(__dirname, 'files', 'writePromisesData.txt'), '\n\nnew Text is');
		await fsPromises.rename(path.join(__dirname, 'files', 'writePromisesData.txt'), path.join(__dirname, 'files', 'Newrite.txt'));
		
	} catch (err) {
		console.error(err)
	}
}

/* call fileOps */