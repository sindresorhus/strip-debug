# strip-debug [![Build Status](https://secure.travis-ci.org/sindresorhus/strip-debug.png?branch=master)](http://travis-ci.org/sindresorhus/strip-debug)

> Strip `console` and `debugger` statements from JavaScript code

Useful for making sure you didn't leave any logging in production code.


## Install

Install locally with [npm](https://npmjs.org/package/strip-debug):

```
npm install --save strip-debug
```

Or globally if you want to use it as a CLI app:

```
npm install --global strip-debug
```

You can then use it in your Terminal like:

```
strip-debug src/app.js > dist/app.js
```

Or pipe something to it:

```
echo 'function foo(){console.log("bar")' | strip-debug
//=> function foo(){}
```


## Example

```js
var stripDebug = require('strip-debug');

stripDebug('function foo(){console.log("bar");debugger;').toString();
//=> function foo(){}
```


### API

## stripDebug(input)

Returns the modified [Esprima AST](http://esprima.org) which can be used to make additional modifications.

Call `.toString()` to get the stringified output.

### input

Type: `String`|`Object`

Pass in a string of JavaScript code or a [Esprima compatible AST](http://esprima.org).


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
