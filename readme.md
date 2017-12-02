# filter-map

Returns a copy of a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) object containing only those entries which pass a test function.

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
```

If no test function is provided, values are filtered by truthiness:

```javascript
const filterMap = require('filter-map')
const map = new Map([[1, true], [2, false], [3, true]])
filterMap(map).size // 2
```
