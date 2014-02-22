# strip-debug [![Build Status](https://secure.travis-ci.org/sindresorhus/strip-debug.png?branch=master)](http://travis-ci.org/sindresorhus/strip-debug)

> Strip `console` and `debugger` statements from JavaScript code

Useful for making sure you didn't leave any logging in production code.

Also available as a [gulp](https://github.com/sindresorhus/gulp-strip-debug) and [grunt](https://github.com/sindresorhus/grunt-strip-debug) task.


## Install

```
npm install --save strip-debug
```


## Example

```js
var stripDebug = require('strip-debug');

stripDebug('function foo(){console.log("bar");debugger;').toString();
//=> function foo(){void 0;}
```


### API

## stripDebug(input)

Returns the modified [Esprima AST](http://esprima.org) which can be used to make additional modifications.

Call `.toString()` to get the stringified output.

To prevent any side-effects, `console.*` is replaced with `void 0` instead of being stripped.

### input

Type: `String`|`Object`

Pass in a string of JavaScript code or a [Esprima compatible AST](http://esprima.org).


## CLI

You can also use it as a CLI app by installing it globally:

```bash
npm install --global strip-debug
```

#### Usage

```bash
strip-debug src/app.js > dist/app.js
```

or pipe something to it:

```bash
echo 'function foo(){console.log("bar")' | strip-debug
#=> function foo(){}
```


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
