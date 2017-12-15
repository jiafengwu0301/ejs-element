var test = require('tape'), 
    Nightmare = require('nightmare'), 
    nightmare = new Nightmare(), 
    _ = require('underscore'),     
    _s = require('underscore.string')

test('Test opens', (t) => {
  t.plan(1)

  nightmare
  .goto('file://' + process.cwd() + '/test/test.html')
  .evaluate(() => document.title)
  .then((result) => {
    t.equals(result, 'ejs-element Test', 'Test page opens and title is correct')
  })
  .catch((err) => {
    console.log(err)
  }) 
})

test('Basic ejs-element features work as expected', (t) => {
  t.plan(2)

  nightmare  
  .goto('file://' + process.cwd() + '/test/basic.html')
  .evaluate(() => {
    return [document.getElementsByTagName("my-element")[0].innerHTML, 
    document.getElementsByTagName("another-element")[0].innerHTML]
  })
  .end()
  .then((results) => {
    results = _.map(results, (result) => {
      return _s(result).replaceAll('\n', '').clean().value()
    })
    t.equals(results[0], 'This is an ejs-element. It can have apples.', 'ejs-element renders with a variable OK')
    t.equals(results[1], 'This is another ejs-element. It can do logic.', 'ejs-element renders logic OK')

  })
  .catch((err) => {
    console.log(err)
  }) 
})