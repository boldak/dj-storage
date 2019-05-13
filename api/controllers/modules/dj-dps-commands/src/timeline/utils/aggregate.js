let moment = require("moment");
let util = require("util");

let testData = {
	"events": {
		"total": 2,
		"range": {
			"min": "2019-03-26T19:04:58.966Z",
			"max": "2019-03-26T19:05:35.262Z"
		},
		"timeline": [
			{
				"user": {
					"passports": [],
					"isAdmin": true,
					"email": "boldak.andrey@gmail.com",
					"name": "Ananimous",
					"photo": ".",
					"createdAt": "2017-12-18T13:53:14.442Z",
					"updatedAt": "2019-03-26T18:23:04.696Z",
					"id": "riyr2atv6gf",
					"isLoggedIn": true,
					"isOwner": true,
					"isCollaborator": false,
					"icon": "mdi-account-circle-outline"
				},
				"date": "2019-03-26T19:04:58.966Z"
			},
			{
				"user": {
					"passports": [],
					"isAdmin": true,
					"email": "boldak.andrey@gmail.com",
					"name": "Ananimous",
					"photo": ".",
					"createdAt": "2017-12-18T13:53:14.442Z",
					"updatedAt": "2019-03-26T18:23:04.696Z",
					"id": "sk8dobuyyz",
					"isLoggedIn": true,
					"isOwner": true,
					"isCollaborator": false,
					"icon": "mdi-account-circle-outline"
				},
				"date": "2019-03-26T19:05:35.262Z"
			}
		]
	},
	"questions": [
		{
			"id": "7effruzr30k",
			"responses": [
				[
					"6hrphniio7",
					"bpzmoiwbmm"
				],
				[
					"bpzmoiwbmm",
					"jmwaon1l2af"
				]
			]
		},
		{
			"id": "h9ah3zd8jjw",
			"responses": [
				[
					"7b8sbzsfpo",
					"wnexi9r73g",
					"unqfqs1nk9c",
					"zbuvv8ttmlh"
				],
				[
					"7b8sbzsfpo",
					"z2beq42nvzc",
					"wnexi9r73g"
				]
			]
		},
		{
			"id": "zr9hlcf30o",
			"responses": [
				[
					"qfv22u3ypi",
					"lcovcublbvq"
				],
				[
					"qfv22u3ypi",
					"lcovcublbvq",
					"2fbpw4ctag9"
				]
			]
		},
		{
			"id": "988vqwblcn6",
			"responses": [
				[
					"uz870qafko",
					"zoxmr1gnmcf",
					"txw0dfd2hn"
				],
				[
					"uz870qafko",
					"zoxmr1gnmcf",
					"wmd6d5xymc"
				]
			]
		},
		{
			"id": "vvp4urkjf58",
			"responses": [
				null,
				null
			]
		},
		{
			"id": "lc9lmojdcq",
			"responses": [
				null,
				null
			]
		},
		{
			"id": "tksq9qcvlxf",
			"responses": [
				null,
				null
			]
		},
		{
			"id": "l7cal4qg1y",
			"responses": [
				null,
				null
			]
		},
		{
			"id": "wa7ful0von",
			"responses": [
				null,
				null
			]
		},
		{
			"id": "okp7n5xesdh",
			"responses": [
				null,
				null
			]
		},
		{
			"id": "ifmo61u8swe",
			"responses": [
				null,
				null
			]
		},
		{
			"id": "iv9npjbztem",
			"responses": [
				null,
				null
			]
		},
		{
			"id": "33d5gfyl6k9",
			"responses": [
				null,
				null
			]
		},
		{
			"id": "43anw0r264i",
			"responses": [
				null,
				null
			]
		},
		{
			"id": "hft79qqd40s",
			"responses": [
				null,
				null
			]
		},
		{
			"id": "hz09mut0st",
			"responses": [
				null,
				null
			]
		},
		{
			"id": "vj07mrzcwnc",
			"responses": [
				null,
				null
			]
		},
		{
			"id": "06tuf22v0p4v",
			"responses": [
				null,
				null
			]
		},
		{
			"id": "n50y9siwy0e",
			"responses": [
				null,
				null
			]
		},
		{
			"id": "fdqfztzn1zd",
			"responses": [
				null,
				null
			]
		},
		{
			"id": "28xyiomtedx",
			"responses": [
				null,
				null
			]
		},
		{
			"id": "ei2k2pvruu4",
			"responses": [
				null,
				null
			]
		},
		{
			"id": "uijwgfde88",
			"responses": [
				null,
				null
			]
		}
	]
}



let round = ( date, start, level, value) => {
      let defFormat = "YYYY-MM-DD HH:mm";
    
      let lo = moment(start).startOf(level).format(defFormat)
      let hi = moment(lo).add(value,level).format(defFormat)
      while(!(moment(date).isSameOrAfter(lo) && moment(date).isSameOrBefore(hi))){
        lo = hi;
        hi = moment(lo).add(value,level).format(defFormat);
      }

      let dLo = moment(date).diff(lo)
      let dHi = -moment(date).diff(hi)
      return (dLo < dHi) ? lo: hi
    }

 let getResponseDynamic = (r) => {
      let responses = r.events.timeline;
     

      let defFormat = "YYYY-MM-DD HH:mm";
      let inputFormat = "DD/MM/YY HH:mm";


      let RStat = responses
          .map(item => moment(new Date(item.date)))
          .sort((a,b) => a.diff(b))
          .map(item => item.format(defFormat))

      RStat.push(moment(new Date()).format(defFormat))    
      
      let p = [
        ['m',1],
        ['m',5],
        ['m',10],
        ['m',15],
        ['m',20],
        ['m',30],
        ['h',1],
        ['h',2],
        ['h',4],
        ['h',12],
        ['d',1],
        ['d',3],
        ['d',7],
        ['M',1],
        ['M',3],
        ['M',6],
        ['y',1],
        ['y',2],
        ['y',5],
        ['y',10]
      ]
      
      
      let getPoints = (start, stop, level, value) => {
        let res =[];
        start = moment(start).add(-value,level).format(defFormat);
        stop = moment(new Date()).format(defFormat);
         
        let lo = moment(start).startOf(level).format(defFormat)
        let hi = moment(lo).add(value,level).format(defFormat)
        res.push(lo)
        while(!(moment(stop).isSameOrAfter(lo) && moment(stop).isSameOrBefore(hi))){
          lo = hi;
          hi = moment(lo).add(value,level).format(defFormat);
          res.push(lo)
        }
        res.push(hi)
        return res;      
      }

      

      let titleFormat = {
        'm' :['HH:mm',''],
        'h' :['DD.MM HH:','00'],
        'd' :['DD.MM',''],
        'M' :['MM.YY',''],
        'y' :['YYYY','']
      } 
      
      let u;
      
      for(u of p){
        if( (moment(RStat[RStat.length-1]).diff(RStat[0],u[0]) / u[1]) <= 12) break;
      }

     
      
      this.u = u;

      
      
      if(moment(RStat[RStat.length-1]).diff(RStat[0],u[0])<1) return;
		RStat.splice(RStat.length-1,1)
      RStat = RStat.map(
        item => round(item,RStat[0],u[0],u[1])
      );
		console.log(RStat)
      let points = getPoints(RStat[0], RStat[RStat.length-1], u[0], u[1]);

      let stats = points.map(item => RStat.filter(t => moment(t).isSame(item,u[0])).length)
      let sum = stats.reduce((item,sum) => {return sum+item})
      
      
      if(sum==0){
            stats = stats.map(item => 0)
          }else{
            stats = stats.map(item => item)//sum )
          }
      
      let max = stats.reduce((item,max) => {return (max>item) ? max : item})
          
      RStat = points.map((item,index) => {
        return {
          title: moment(item).format(titleFormat[u[0]][0])+titleFormat[u[0]][1],
          value: stats[index],
          height: (max>0) ? stats[index]/max : 0
        }
      })

      this.points = points;
      // console.log(RStat)
      return RStat;
    }


console.log(getResponseDynamic(testData))    