
const parser = require('../src/parser');


const parsed = new parser().config()
  .parse(
    `set('tags')

<?html
 DB totals:<br/>datasets:&nbsp;
?>
// test

/*
 test
*/

append({{datasets}})
wrap(tag:'div', style:'margin:0')
html()`
  );

console.log(parsed.length);
