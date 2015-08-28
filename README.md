# eventuate-map

[![NPM version](https://badge.fury.io/js/eventuate-map.png)](http://badge.fury.io/js/eventuate-map)
[![Build Status](https://travis-ci.org/Georgette/eventuate-map.svg?branch=master)](https://travis-ci.org/Georgette/eventuate-map)
[![Coverage Status](https://coveralls.io/repos/Georgette/eventuate-map/badge.png?branch=master)](https://coveralls.io/r/Georgette/eventuate-map?branch=master)

create a mapped eventuate

## example


```javascript

var eventuate = require('eventuate'),
    map       = require('eventuate-map')

var pie = eventuate()
pie(function (p) {
    console.log('%s served...', p.type)
})

var addTopping = map(pie, function (pie) {
    switch (pie.type) {
        case 'shoofly':
            pie.topping = 'vanilla ice cream'
            break
        case 'pumpkin':
            pie.topping = 'whipped cream'
            break
        case 'apple':
            pie.topping = 'maple walnut syrup'
            break
        default:
            pie.topping = 'a cherry'
    }
    return pie
})

addTopping(function (p) {
    console.log('Love %s on my %s pie', p.topping, p.type)
})

pie.produce({type: 'apple' })
pie.produce({type: 'shoofly' })
pie.produce({type: 'pumpkin' })

```

## api

```javascript
var eventuate = require('eventuate')
var map       = require('eventuate-map')

var upstreamEventuate = eventuate()
```

### var mappedEventuate = map(upstreamEventuate, mapFunc)

Returns a new eventuate which produces mapped event payloads from eventuate `upstreamEventuate` using `mapFunc` .  `mapFunc` should have the signature `function (data) { }`, and return the mapped payload. This function receives all event data from `upstreamEventuate`.

If `upstreamEventuate` is an unmonitored eventuate, `filteredEventuate` will return an unmonitored eventuate.

### mappedEventuate.unsubscribe()

Stop consuming events from `upstreamEventuate` (and thus stop producing events).

### mappedEventuate.upstreamConsumer

The function added as a consumer to the `upstreamEventuate`. Example:

```javascript
var consumerIdx = upstreamEventuate.consumers.indexOf(mappedEventuate.upstreamConsumer)
assert(consumerIdx >= 0)
```

## install

With [npm](https://npmjs.org) do:

```
npm install eventuate-map
```

## testing

`npm test [--dot | --spec] [--phantom] [--grep=pattern]`

Specifying `--dot` or `--spec` will change the output from the default TAP style.
Specifying `--phantom` will cause the tests to run in the headless phantom browser instead of node.
Specifying `--grep` will only run the test files that match the given pattern.

### browser test

`npm run browser-test`

This will run the tests in all browsers (specified in .zuul.yml). Be sure to [educate zuul](https://github.com/defunctzombie/zuul/wiki/cloud-testing#2-educate-zuul) first.

### coverage

`npm run coverage [--html]`

This will output a textual coverage report. Including `--html` will also open
an HTML coverage report in the default browser.
