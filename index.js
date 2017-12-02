'use strict'

const filterIterator = require('filter-iterator')
const PossibleFunction = require('possible-function')

module.exports = (map, test) => new (map.constructor)(filterIterator(map.entries(), e => PossibleFunction(test, (k, v) => !!v)(...e)))
