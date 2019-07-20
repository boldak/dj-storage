let STAT = require("../lib/stat")

let data = [
	[1,0],[1,0],[1,0],[1,0],[1,0],[1,0],
	// [0.5, 0.5],
	[0,1]
]

console.log(STAT.lstsq(2, 7, data.map(d=> d[0]), data.map(d=> d[1])))