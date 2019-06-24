var sentiment = require('multilang-sentiment');
// var data = require("./data")
// 	.map( item => item.description )
// 	.forEach( item => {
// 		console.dir(sentiment(item),"uk")
// 	})



// var r1 = sentiment('Cats are stupid.', 'en');
// console.dir(r1);        // Score: -2, Comparative: -0.666

// var r2 = sentiment('Cats are totally amazing!'); // "en" by default
// console.dir(r2);        // Score: 4, Comparative: 1

console.dir(sentiment(
	`Що за херня ? Що "Енергоатом" підписав? Малі модульні реактори ? Чорнобиль у кожну хатинку ? І це - без жодного обговорення, просто поставили перед фактом?
Судячи з Інтернету, "нормальні" країни жодної зацікавленості у цьому лайні не проявляють. Зацікавліні Пакістан, Китай та інші країни, де багато народу, і життя окремої людини вартує мало.`
,"uk"
	))