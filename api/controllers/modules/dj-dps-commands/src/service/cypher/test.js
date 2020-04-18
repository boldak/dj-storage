// var neo4j = require('neo4j');
// var db = new neo4j.GraphDatabase("https://app83770167-ox1Zqa:b.B4Qo0rZ6iEma.oeLC4GLf4cfzUYRL@hobby-ihcfdcabchbdgbkefkpdapel.dbs.graphenedb.com:24780")//process.env['GRAPHENEDB_URL']);
// console.log(db)
// db.cypher({
//     query: 'CREATE (n:Person {name: {personName}}) RETURN n',
//     params: {
//         personName: 'Bob'
//     }
// }, function(err, results){
//     var result = results[0];
//     if (err) {
//         console.error('Error saving new node to database:', err);
//     } else {
//         console.log('Node saved to database with id:', result['n']['_id']);
//     }
// });


var neo4j = require('neo4j-driver');

var graphenedbURL = "bolt://hobby-ihcfdcabchbdgbkefkpdapel.dbs.graphenedb.com:24787"//process.env.GRAPHENEDB_BOLT_URL;
var graphenedbUser = "app83770167-ox1Zqa"//process.env.GRAPHENEDB_BOLT_USER;
var graphenedbPass = "b.B4Qo0rZ6iEma.oeLC4GLf4cfzUYRL"//process.env.GRAPHENEDB_BOLT_PASSWORD;

var driver = neo4j.driver(graphenedbURL, neo4j.auth.basic(graphenedbUser, graphenedbPass));

var session = driver.session();

session
    .run("CREATE (n {hello: 'World'}) RETURN n.name")
    .then(function(result) {
	console.log(">>",result)
        result.records.forEach(function(record) {
            console.log(record)
        });

        session.close();
	driver.close()
    })
    .catch(function(error) {
        console.log(error);
    });

 