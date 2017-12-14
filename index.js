'use strict'

const {entries, reconstruct} = require('m-o')
const filterIterable = require('filter-iter')
const isPlainObject = require('is-plain-object')
const PossibleFunction = require('possible-function')

module.exports = (map, test, options) => {
  if (isPlainObject(test) && !isPlainObject(options)) options = test
  test = PossibleFunction(test, (k, v) => !!v)
  return reconstruct(map, filterIterable(entries(map), entry => test(...entry), options))
}
