module.exports = [
	require("./uri/ip"),
	require("./uri/info"),
	require("./newsapi/google-news"),
	require("./dict/countries"),
	require("./elasticsearch/elasticsearch"),
	require("./nlp-uk/token"),
	require("./nlp-uk/ner"),

]
.concat(require("./cypher"))
.concat(require("./mysql"))
.concat(require("./plantuml"))
	