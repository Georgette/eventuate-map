var test        = require('tape'),
    map         = require('..'),
    eventuate   = require('eventuate')

test('should be a function', function (t) {
    t.equal(typeof map, 'function')
    t.end()
})

test('eventuate map', function (t) {
    t.plan(8)

    var event = eventuate()
    var multiplyTen = map(event, function (v) { return v * 10 })

    t.ok(~event.consumers.indexOf(multiplyTen.upstreamConsumer), 'adds consumer to upstream event')

    t.ok(multiplyTen.consumerAdded, 'has consumerAdded')
    t.ok(multiplyTen.consumerRemoved, 'has consumerRemoved')
    t.ok(multiplyTen.hasConsumer !== undefined, 'has hasConsumer')

    var eventCount = 0
    event(function () {
        eventCount++
    })

    var multiplyTenCount = 0
    var mappedValues = []
    multiplyTen(function (v) {
        mappedValues.push(v)
        multiplyTenCount++
        if (multiplyTenCount === 2) {
            t.deepEqual(mappedValues, [20, 10], 'should give multiplication of 10 in order')
        }
    })

    t.true(multiplyTen.hasConsumer, 'registers consumers')

    event.produce(2)
    event.produce(1)

    // after unsubscribe, no more events should propogate
    multiplyTen.unsubscribe()
    t.notOk(~event.consumers.indexOf(multiplyTen.upstreamConsumer), 'unsubscribe removes consumer from upstream event')
    event.produce(1)
    event.produce(1)

    t.equal(eventCount, 4, 'produce 4 events')

})
