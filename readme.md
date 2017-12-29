# strip-debug [![Build Status](https://travis-ci.org/sindresorhus/strip-debug.svg?branch=master)](https://travis-ci.org/sindresorhus/strip-debug)

> Strip `console`, `alert`, and `debugger` statements from JavaScript code

Useful for making sure you didn't leave any logging in production code.

Also available as [Gulp](https://github.com/sindresorhus/gulp-strip-debug)/[Grunt](https://github.com/sindresorhus/grunt-strip-debug)/[Broccoli](https://github.com/sindresorhus/broccoli-strip-debug) plugins.


## Usage

```
$ npm install strip-debug
```


## Usage

```js
const stripDebug = require('strip-debug');

stripDebug('function foo(){console.log("foo");alert("foo");debugger;}').toString();
//=> 'function foo(){void 0;void 0;}'
```


### API

## stripDebug(input)

Returns the modified [Esprima AST](http://esprima.org) which can be used to make additional modifications.

Call `.toString()` to get the stringified output.

To prevent any side-effects, `console.*`/`alert*` is replaced with `void 0` instead of being stripped.

If you shadow the `console` global with your own local variable, it will still be removed.

### input

Type: `string` `Object`

Pass in a string of JavaScript code or a [Esprima compatible AST](http://esprima.org).


## Related

- [strip-debug-cli](https://github.com/sindresorhus/strip-debug-cli) - API for this module


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
