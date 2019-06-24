let util = require("util");
let _ = require("lodash-node")
let StatError = require("./staterror")

module.exports = {
	
	isMatrix(matrix){
		if(!util.isArray(matrix)) return false;
		if (matrix.filter( r => !util.isArray(r)).length > 0) return false;
		return true; 
	},



	matrix2floats(matrix){
		try {

			let res = matrix.map( row => row.map(col => ( (col !== undefined) ? Number.parseFloat(col.toString()) : Number.NaN)))
			let validations = []
			
			res.forEach( (r,i1) => {
				r.forEach( (v,i2) => {
					if(Number.isNaN(v)) validations.push([i1,i2])
				})	
			})
			
			
			if ( validations.length > 0 ) throw new StatError("Cannot convert matrix to floats") 
			return res	
		} catch (e) {
			throw new StatError("matrix " +e.toString())
		}
	},

	array2floats(array){
		try {
			let res = array.map( d => Number.parseFloat(d.toString()))
			let v = res.filter( r =>  Number.isNaN(r))
			if ( v.length > 0 ) throw new StatError("Cannot convert array to floats") 
			return res	
		} catch (e) {
			throw new StatError(e.toString())
		}
	},

	transpose(matrix){
		let res = []
		matrix[0].forEach( (r, index) => {
            res.push(matrix.map(item => item[index]))
        })
        return res
	}

}