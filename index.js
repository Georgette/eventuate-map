module.exports = function mkMappedEventuate (eventuate, map) {
    var mappedEventuate = eventuate.factory({ monitorConsumers: eventuate.hasConsumer !== undefined })
    mappedEventuate.upstreamConsumer = mapConsumer
    mappedEventuate.unsubscribe = function mappedEventuateUnsubscribe () {
        eventuate.removeConsumer(mapConsumer)
    }

    eventuate(mapConsumer)
    return mappedEventuate

    function mapConsumer (data) {
        mappedEventuate.produce(map(data))
    }
}
