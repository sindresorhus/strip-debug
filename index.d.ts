import {PluginObj, types} from '@babel/core';

/**
Strip `console`, `alert`, and `debugger` statements from JavaScript code.

@param babel - Babel instance, passed automatically when using Babel.

@example
```
import {transformSync} from '@babel/core';
import stripDebug from 'strip-debug';

transformSync('function foo(){console.log("foo");alert("foo");debugger;}', {
  plugins: [stripDebug]
}).code;
//=> 'function foo() { void 0;void 0; }'
```
*/
export default function stripDebugPlugin(babel: {readonly types: typeof types}): PluginObj;
