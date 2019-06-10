let dns = require("dns")
let url = require("url")
let Promise = require("bluebird")
let http = require('request-promise');

let resolveUrl = (uri) => new Promise((resolve, reject) => {
	dns.resolve(url.parse(uri,true).host, (error, addresses) => { 
		if (error) {
			reject(error)
		} else {
			resolve(addresses[0])
		}
	})	
})


let aboutIp = (ip) => http({
    uri: "http://ip-api.com/json/"+ip,
    method: "get"
}).then(data => {
	let res = JSON.parse(data)
	res.ipAddress = ip
	return res
})


module.exports = {
	resolveUrl,
	aboutIp
}


// resolveUrl('https://im6.kommersant.ru')
// 	.then( address => {
		
// 		aboutIp(address)
// 			.then(data => {

// 				console.log(JSON.stringify(data,null,'\t'))
// 			})
// 			.catch(e => {
// 				console.error(e)		
// 			}) 
// 	})
// 	.catch((e) => {
// 		console.error(e)
// 	})