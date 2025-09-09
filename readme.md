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

## Ignoring specific lines

You can ignore specific statements from being stripped by using special comments:

```js
// strip-debug-ignore-next
console.log('This will NOT be stripped');

console.log('This will be stripped'); // strip-debug-ignore
```

Both comment styles work:
- `// strip-debug-ignore-next` - Ignores the next line
- `// strip-debug-ignore` - Ignores the current line (inline comment)
- `/* strip-debug-ignore-next */` - Block comment style also works

## Related

- [strip-debug-cli](https://github.com/sindresorhus/strip-debug-cli) - API for this package
