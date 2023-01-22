const add = (a, b) => a + b;
const subtract = (a, b) => a - b;


/* how to export the functions */
module.exports = {
	add,
	subtract
}

/* export 없이 한번에 하는 법 */
/* exports.add = (a , b) => a + b; */