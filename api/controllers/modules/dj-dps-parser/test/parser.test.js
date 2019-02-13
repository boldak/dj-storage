const parser = require('../src/parser');
const ParserError = require('../src/exceptions/parserError');

const scripts =
`set('tags')

<?html
  DB totals:<br/>datasets:&nbsp;
?>
// test

/*
  test
*/

append({{datasets}})
wrap(
  tag:'div', style:'margin:0'
)
html()`;

const scriptsWithErr =
`set('tags')

<?html
DB totals:<br/>datasets:&nbsp;
?>
// test

/*
test
*/

append({{datasets}})
wrap(
  tag:'div', style:'margin:0'
)
html)`;


const scriptsWithErr1 =
`set('tags')
<?html
  DB totals:<br/>datasets:&nbsp;
?>
// test
/*
  test
*/
append({datasets}})
wrap(
  tag:'div', style:'margin:0'
)
html()`;


test('positive test of parsing', () => {
  expect(new parser().parse(scripts)).not.toBeNull();
});

test('negative test of parsing', () => {
  function wrapper() {
    return new parser().parse(scriptsWithErr);
  }

  function wrapper2() {
    return new parser().parse(scriptsWithErr1);
  }

  expect(wrapper).toThrowError(/line 16/);
  expect(wrapper2).toThrowError(/line 9/);
});
