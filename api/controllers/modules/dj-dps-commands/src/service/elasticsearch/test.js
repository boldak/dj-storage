var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

/*
client.ping({
  // ping usually has a 3000ms timeout
  requestTimeout: 1000
}, function (error) {
  if (error) {
	console.log(error.toString())
    console.trace('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});
*/

client.search({
  index: 'kibana_sample_data_flights',
//  type: 'tweets',
  body: {
   query: {
      match: {
       Cancelled: true
      }
    }
  }
}
).then(response => {

	for (const tweet of response.hits.hits) {
  console.log('tweet:', tweet);
}
})
