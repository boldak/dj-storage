const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('4713697fa6024dccaee7ed8f03f728f3');

// // To query top headlines
// // All options passed to topHeadlines are optional, but you need to include at least one of them
// newsapi.v2.topHeadlines({
//   q: 'зеленский',
//   // category: 'politics',
//   // language: 'uk',
//   // country: 'ua'
// }).then(response => {
//   console.log(response);
//   /*
//     {
//       status: "ok",
//       articles: [...]
//     }
//   */
// });

// // To query everything
// // You must include at least one q, source, or domain
newsapi.v2.everything({
  q: 'зеленский',
  // category: 'politics',
  // sources: 'bbc-news,the-verge',
  // domains: 'bbc.co.uk,techcrunch.com',
  from: '2019-06-02',
  to: '2019-06-02',
  // language: 'en',
  sortBy: 'relevancy',
  pageSize:100
  // country:'ua',
  // page: 2
}).then(response => {
  console.log(JSON.stringify(response, null, "\t"));
  /*
    {
      status: "ok",
      articles: [...]
    }
  */
});

// To query sources
// All options are optional
// newsapi.v2.sources({
//   // category: 'technology',
//   // language: 'uk',
//   country: 'ua'
// }).then(response => {
//   console.log(JSON.stringify(response, null, "\t"));
//   /*
//     {
//       status: "ok",
//       sources: [...]
//     }
//   */
// });