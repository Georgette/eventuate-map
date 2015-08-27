module.exports = function mkMappedEventuate (eventuate, map) {
    // create a new eventuate with the parent's setting
    var mappedEventuate = eventuate.factory({ monitorConsumers: eventuate.hasConsumer !== undefined })

    // expose to external sources
    mappedEventuate.upstreamConsumer = mapConsumer

    // destroy upstream consumer
    mappedEventuate.unsubscribe = function mappedEventuateUnsubscribe () {
        eventuate.removeConsumer(mapConsumer)
    }

    // create new eventuate upstream consumer
    eventuate(mapConsumer)

    return mappedEventuate

    function mapConsumer (data) {
        // act on original producers payload, and emit(produce) event
        mappedEventuate.produce(map(data))
    }
}
