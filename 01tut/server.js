// Possibly experience with other libraries and frameworks
// How NodeJs differ from Vanilla JS
// 1) Node Runs on a server - not in browser (backend, not a frontend)
// -> browser = 브라우저엔진 + webAPIS || node = V8(파싱 + 해석 + 최적화) + libuv(inc 이벤트루프)
// 2) The console is the terminal window
// type 'node server' in terminal window
console.log('hello');
// you can see 'hello'

// 3) global object instead of window object
// window object는 브라우저를 refer함. (창크기나 이런것들)
// global object는 'global'로 확인할 수 있음
console.log(global);
// you can see 'Global Object'

// 4) Has common Core modules that we will explore
// OS, FS, SERVER<
// 5) CommonJS modules instead of ES6 Modules
// 6) Missing some JS APIs like fetch

const os = require('os');
const path = require('path');
console.log(os.type())
console.log(os.version())
console.log(os.homedir())
// you can see information about os

console.log(__dirname);
console.log(__filename);
// you can see infomation about dirname and filename

console.log(path.dirname(__filename));
console.log(path.basename(__filename));
console.log(path.extname(__filename));
// you can see dir in the file, basename, and extension name

console.log(path.parse(__filename))
// you can see object about fileName


/* call a function form math.js */
/* calling whole function */
const math = require('./math')
/* calling specific function selected */
const { add } = require('./math')

