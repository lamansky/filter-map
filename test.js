'use strict'

const assert = require('assert')
const filterMap = require('.')

describe('filterMap()', function () {
  it('should retain elements that test true and remove those that test false', function () {
    const s = Symbol('s')
    let m = new Map([['one', s], ['two', 'other'], ['three', s]])
    m = filterMap(m, (k, v) => v === s)
    assert.strictEqual(m.get('one'), s)
    assert.strictEqual(typeof m.get('two'), 'undefined')
    assert.strictEqual(m.get('three'), s)
    assert.strictEqual(m.size, 2)
  })

  it('should filter by truthiness if no test is provided', function () {
    const m = filterMap(new Map([[1, false], [2, true], [3, true]]))
    assert.strictEqual(typeof m.get(1), 'undefined')
    assert.strictEqual(m.get(2), true)
    assert.strictEqual(m.get(3), true)
    assert.strictEqual(m.size, 2)
  })

  it('should return a Map of the same subclass', function () {
    class XMap extends Map {}
    let m = new XMap([[0, true], [1, false]])
    m = filterMap(m, (k, v) => !!v)
    assert(m instanceof XMap)
    assert.strictEqual(m.size, 1)
  })
})
