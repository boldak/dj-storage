let toPath = require("lodash-node/compat/internal/toPath")
let _ = require("lodash-node")

let toPlainObject = object => {
	let res = []
	
	let pairs = _.pairs(object).map( d => ({
		path: d[0],
		value: d[1]
	}))

	pairs.forEach( d => {
		let embedded = ( _.isObject(d.value) || _.isArray(d.value)) ? toPlainObject(d.value) : d.value
		if( _.isArray(embedded) ){
			embedded.forEach( e => {
				res.push({
					path: ((_.isArray(d.path)) ? d.path : [d.path]).concat(((_.isArray(e.path)) ? e.path : [e.path])),
					value: e.value
				})
			})
		} else {
			res.push(d)
		}
	})

	return res
}

let getSelection = (object, selector) => {
	
	let path = toPath(selector).map( d => {
	    let res = d.split(",")
	    res = res.map(d1 => d1.trim())
	    res = (res.length == 1) ? res[0] : res
	    return res
	})
	let plained = toPlainObject(object)

	return plained.filter( p => {
		let res = true
		p.path.forEach( (part, idx) => {
			
			res &= !_.isUndefined(path[idx]) 
					&& ( 
						path[idx] == "*" 
						|| 
						((_.isArray(path[idx]) 
							? !_.isUndefined(_.find(path[idx], i => i == part)) 
							: path[idx] == part))) 
			// if(_.isArray(path[idx])) console.log(`FIND "${part}" in `,path[idx],` -> `, _.find(path[idx], i => i == part))
		})
		return res	
	})
}

// let path = [
// 	"data.*.*.[nodes,relationships].*",
// 	"data.*.*.[start,end]"
// ]	

// let data = {
//     "columns": [
//         "p"
//     ],
//     "data": [
//         [
//             {
//                 "relationships": [
//                     "http://127.0.0.1:7474/db/data/relationship/203",
//                     "http://127.0.0.1:7474/db/data/relationship/202",
//                     "http://127.0.0.1:7474/db/data/relationship/91",
//                     "http://127.0.0.1:7474/db/data/relationship/92"
//                 ],
//                 "nodes": [
//                     "http://127.0.0.1:7474/db/data/node/19",
//                     "http://127.0.0.1:7474/db/data/node/144",
//                     "http://127.0.0.1:7474/db/data/node/71",
//                     "http://127.0.0.1:7474/db/data/node/73",
//                     "http://127.0.0.1:7474/db/data/node/34"
//                 ],
//                 "directions": [
//                     "->",
//                     "<-",
//                     "->",
//                     "<-"
//                 ],
//                 "length": 4,
//                 "start": "http://127.0.0.1:7474/db/data/node/19",
//                 "end": "http://127.0.0.1:7474/db/data/node/34"
//             }
//         ]
//     ]
// }

// console.log(toPlainObject(data))
// console.log("==================================")
// console.log(path," => ", _.flatten(path.map( p => getSelection(data,p))))

module.exports = {
	getSelection
}	