# filter-map

Returns a copy of a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) or Object containing only those entries which pass a test function.

Supports a numeric limit on the number of entries in the resulting Map or Object.

## Installation

```bash
npm install filter-map --save
```

## Usage

```javascript
const filterMap = require('filter-map')

const map = new Map([['a', 1], ['b', 2], ['c', 3]])
const filteredMap = filterMap(map, (key, value) => value > 1)
filteredMap.size // 2

// Works on objects too
const obj = {a: 1, b: 2, c: 3}
filterMap(obj, (key, value) => value > 1) // {b: 2, c: 3}
```

If no test function is provided, values are filtered by truthiness:

```javascript
const filterMap = require('filter-map')

const map = new Map([[1, true], [2, false], [3, true]])
filterMap(map).size // 2

filterMap({1: true, 2: false, 3: true}) // {1: true, 3: true}
```

If you only want a certain number of entries in the filtered Map or Object, you can specify a numeric limit parameter:

```javascript
const obj = {a: 0, b: 1, c: 2, d: 3}
filterMap(obj, (k, v) => v > 1, {limit: 1}) // {c: 2}
filterMap(obj, {limit: 1}) // {b: 1}
```
