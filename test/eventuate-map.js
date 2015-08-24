var test        = require('tape'),
    map         = require('..'),
    eventuate   = require('eventuate')

test('should be a function', function (t) {
    t.equal(typeof map, 'function')
    t.end()
})

test('should map events', function (t) {
    var event = eventuate()
    
    t.end()
})
