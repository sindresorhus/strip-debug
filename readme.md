# strip-debug

> Strip `console`, `alert`, and `debugger` statements from JavaScript code

Useful for making sure you didn't leave any logging in production code.

## Usage

```sh
npm install @babel/core strip-debug
```

## Usage

```js
import {transformSync} from '@babel/core';
import stripDebug from 'strip-debug';

transformSync('function foo(){console.log("foo");alert("foo");debugger;}', {
	plugins: [stripDebug]
}).code;
//=> 'function foo() { void 0;void 0; }'
```

To prevent any side-effects, `console.*`/`alert*` is replaced with `void 0` instead of being stripped.

If you shadow the `console` global with your own local variable, it will still be removed.

## Related

- [strip-debug-cli](https://github.com/sindresorhus/strip-debug-cli) - API for this module
