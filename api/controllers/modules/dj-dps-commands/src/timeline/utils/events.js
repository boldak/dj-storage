let moment = require("moment")
let util = require("util")


// INDICATOR USAGE

// let eventIndicator1 = indicator(
// {
// 		"start":{
// 			"stamp":"2017-05-22 04:00",
// 			"format":"YYYY-MM-DD HH:mm"	
// 		},

// 		// "end":{
// 		// 	"stamp":"2017-05-22 07:00",
// 		// 	"format":"YYYY-MM-DD HH:mm"	
// 		// },

// 		"duration":"12:00.0",

// 		"distribution": [{
// 			"rel":"00:00.0",
// 			"prob":0.4
// 		}, {
// 			"rel":"1:30",
// 			"prob":1.0
// 		}, {
// 		    "rel":"3:00",
// 			"prob":0.7
// 		}, {
// 		    "rel":"6:00",
// 			"prob":0.35
// 		}, {
// 		    "rel":"7:00",
// 			"prob":0.1
// 		}, {
// 		    "rel":"9:00",
// 			"prob":0
// 		}],

// 		"period":"1.00:00"

// })


// console.log(eventIndicator1(new Date("2017.05.22 05:00")))
// console.log(eventIndicator1(new Date("2017.05.23 05:00")))
// console.log(eventIndicator1(new Date("2017.05.24 05:00")))
// console.log(eventIndicator1(new Date())) 

// let ind = indicator((date) => (moment(new Date(date)).isSame(moment(new Date("2017.05.22 05:00")))) ? 1 : 0 )

// console.log(ind(new Date("2017.05.22 05:00")))
// console.log(ind(new Date("2017.05.23 05:00")))
// console.log(ind(new Date("2017.05.24 05:00")))
// console.log(ind(new Date())) 



let indicator = (options) => {
    
    if (util.isFunction(options)) return options

    return function(date) {
        date = (date) ? moment(new Date(date)) : moment()
        let start = moment(options.start.stamp, options.start.format)
        let end;

        if (options.end) {
            end = moment(options.end.stamp, options.end.format)
        } else if (options.duration) {
            end = start.clone().add(moment.duration(options.duration))
        } else if (options.distribution) {
            end = start.clone().add(moment.duration(options.distribution[options.distribution.length - 1].rel))
        } else {
            end = start.clone()
        }

        let distribution = options.distribution || [{
            rel: "00:00.0",
            prob: 1.0
        }]

        distribution = distribution.map(d => ({
            rel: moment.duration(d.rel),
            prob: d.prob
        }))

        distribution.push({
            rel: moment.duration(end.diff(start)),
            prob: 0
        })

        let period = (options.period) ? moment.duration(options.period) : null

        if (start.isAfter(date)) return 0

        periodCount = (period) ? Math.trunc(moment.duration(date.diff(start)).asMilliseconds() / period.asMilliseconds()) : 0
        period = (period) ? period : moment.duration("00:00.0")
        start = start.add(moment.duration(period.asMilliseconds() * periodCount, "ms"))

        for (let i = 0; i < distribution.length - 1; i++) {
            let s = start.clone().add(distribution[i].rel)
            let e = start.clone().add(distribution[i + 1].rel)
            if (date.isSameOrAfter(s) && date.isBefore(e)) return distribution[i].prob
        }

        return distribution[distribution.length - 1].prob

    }
}


// TIMEPOINTS USAGE

// let eventIndicator1 = indicator(
// {
// 		"start":{
// 			"stamp":"2017-05-22 00:00",
// 			"format":"YYYY-MM-DD HH:mm"	
// 		},

// 		// "end":{
// 		// 	"stamp":"2017-05-22 07:00",
// 		// 	"format":"YYYY-MM-DD HH:mm"	
// 		// },

// 		 "duration":"06:00",

// 		// "distribution": [{
// 		// 	"rel":"00:00.0",
// 		// 	"prob":1
// 		// }, {
// 		// 	"rel":"1:00",
// 		// 	"prob":2
// 		// }, {
// 		//     "rel":"2:00",
// 		// 	"prob":3
// 		// }, {
// 		//     "rel":"3:00",
// 		// 	"prob":4
// 		// }, {
// 		//     "rel":"4:00",
// 		// 	"prob":5
// 		// }, {
// 		//     "rel":"5:00",
// 		// 	"prob":6
// 		// }],

// 		// "period":"1.00:00"

// })

// console.log(timePoints({
// 	start:{
// 		stamp:"2017-05-22 00:00",
// 		format:"YYYY-MM-DD HH:mm"
// 	},
// 	duration:"2.00:00",
// 	period:"01:00"
// }).map(d => ({
// 	date: moment(d).format("YYYY-MM-DD HH:mm"),
// 	prob:eventIndicator1(d)
// })))


let timePoints = options => {
	let start = moment(options.start.stamp, options.start.format)
    let end;

    if (options.end) {
        end = moment(options.end.stamp, options.end.format)
    } else if (options.duration) {
        end = start.clone().add(moment.duration(options.duration))
    } else if (options.distribution) {
        end = start.clone().add(moment.duration(options.distribution[options.distribution.length - 1].rel))
    } else {
        end = start.clone()
    }

    if(!options.period){
    	if(start.isSame(end)) return [start.toDate()]
    	return [start.toDate(), end.toDate()]
    }

    let period =  moment.duration(options.period)
    let res = []
    for( ; start.isSameOrBefore(end); start = start.add(period)){
    	res.push(start.toDate())
    }
    return res
}


module.exports = {
	eventIndicator:indicator,
	timePoints: timePoints
}