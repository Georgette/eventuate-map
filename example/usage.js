
var eventuate = require('eventuate'),
    map       = require('..')

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
