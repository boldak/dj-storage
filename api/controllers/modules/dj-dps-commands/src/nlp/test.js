var TokenizerUK = require('./lib/tokenizers/aggressive_tokenizer_uk');
var StemmerUK = require('./lib/stemmers/porter_stemmer_uk');

var tokenizer = new TokenizerUK();
// var stemmer = new StemmerUK()

console.log(tokenizer.tokenize("АМКУ просять розслідувати концентрації Фірташа на ринку облгазів"));
console.log(StemmerUK.tokenizeAndStem("АМКУ просять розслідувати концентрації Фірташа на ринку облгазів"));

console.log(tokenizer.tokenize("Зеленский: тень победы! Телеканал 'Звезда' Стали известны окончательные результаты выборов президента на Украине Газета.Ru Стали известны окончательные результаты Зеленского и Порошенко Lenta.ru Казус Зеленского Росбалт Украина: новая ЗЕпоха"));
console.log(StemmerUK.tokenizeAndStem("Зеленский: тень победы! Телеканал 'Звезда' Стали известны окончательные результаты выборов президента на Украине Газета.Ru Стали известны окончательные результаты Зеленского и Порошенко Lenta.ru Казус Зеленского Росбалт Украина: новая ЗЕпоха"));

// var natural = require("natural")
// // console.log(natural.LevenshteinDistance("Порошенка", "Порошенку", {search: true}));
// // console.log(natural.LevenshteinDistance("Порошенківська", "Порошенк",  {search: true}));
// var TFIDF = natural.TfIdf
// console.log(TFIDF.tf())


var natural = require('natural');
var TfIdf = natural.TfIdf;
var tfidf = new TfIdf();

var doc = 
	StemmerUK.tokenizeAndStem("Зеленский: тень победы! Телеканал 'Звезда' Стали известны окончательные результаты выборов президента на Украине Газета.Ru Стали известны окончательные результаты Зеленского и Порошенко Lenta.ru Казус Зеленского Росбалт Украина: новая ЗЕпоха")

var _ = require("lodash-node")
var doc1 = _.unique(doc)
 
tfidf.addDocument(doc)
doc1.forEach( item => {
	tfidf.tfidfs([item], function(i, measure) {
		console.log(item + ' : ' + measure);
	});	
})
