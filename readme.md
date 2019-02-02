# strip-debug [![Build Status](https://travis-ci.org/sindresorhus/strip-debug.svg?branch=master)](https://travis-ci.org/sindresorhus/strip-debug)

> Strip `console`, `alert`, and `debugger` statements from JavaScript code

Useful for making sure you didn't leave any logging in production code.

## Example

**In**

```js
function test(input) {
	debugger
	console.log(input)
	input++
	console.info(input)
	return input
}
```

**Out**

```js
function test(input) {
	input++
	return input
}
```

## Installation

```sh
$ npm install babel-plugin-strip-debug
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
	"plugins": ["strip-debug"]
}
```

### Via CLI

```sh
$ babel --plugins strip-debug script.js
```

### Via Node API

```javascript
require('babel-core').transform('code', {
	plugins: ['strip-debug'],
})
```

## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
