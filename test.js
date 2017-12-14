'use strict'

const assert = require('assert')
const filterMap = require('.')

describe('filterMap()', function () {
  it('should retain only those Map entries which test true', function () {
    const s = Symbol('s')
    let m = new Map([['one', s], ['two', 'other'], ['three', s]])
    m = filterMap(m, (k, v) => v === s)
    assert.strictEqual(m.get('one'), s)
    assert.strictEqual(typeof m.get('two'), 'undefined')
    assert.strictEqual(m.get('three'), s)
    assert.strictEqual(m.size, 2)
  })

  it('should retain only those Object entries which test true', function () {
    const s = Symbol('s')
    let o = {one: s, two: 'other', three: s}
    o = filterMap(o, (k, v) => v === s)
    assert.strictEqual(o.one, s)
    assert.strictEqual(typeof o.two, 'undefined')
    assert.strictEqual(o.three, s)
    assert.strictEqual(Object.keys(o).length, 2)
  })

  it('should filter Map by truthiness if no test is provided', function () {
    const m = filterMap(new Map([[1, false], [2, true], [3, true]]))
    assert.strictEqual(typeof m.get(1), 'undefined')
    assert.strictEqual(m.get(2), true)
    assert.strictEqual(m.get(3), true)
    assert.strictEqual(m.size, 2)
  })

  it('should filter Object by truthiness if no test is provided', function () {
    const o = filterMap({1: false, 2: true, 3: true})
    assert.strictEqual(typeof o[1], 'undefined')
    assert.strictEqual(o[2], true)
    assert.strictEqual(o[3], true)
    assert.strictEqual(Object.keys(o).length, 2)
  })

  it('should support a limit argument', function () {
    const s = Symbol('s')
    let m = new Map([['one', s], ['two', 'other'], ['three', s]])
    m = filterMap(m, (k, v) => v === s, {limit: 1})
    assert.strictEqual(m.get('one'), s)
    assert.strictEqual(typeof m.get('two'), 'undefined')
    assert.strictEqual(typeof m.get('three'), 'undefined')
    assert.strictEqual(m.size, 1)
  })

  it('should support a limit argument with no callback', function () {
    const o = filterMap({1: false, 2: true, 3: true}, {limit: 1})
    assert.strictEqual(typeof o[1], 'undefined')
    assert.strictEqual(o[2], true)
    assert.strictEqual(typeof o[3], 'undefined')
    assert.strictEqual(Object.keys(o).length, 1)
  })

  it('should return a Map of the same subclass', function () {
    class XMap extends Map {}
    let m = new XMap([[0, true], [1, false]])
    m = filterMap(m, (k, v) => !!v)
    assert(m instanceof XMap)
    assert.strictEqual(m.size, 1)
  })
})
