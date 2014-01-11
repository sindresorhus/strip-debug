'use strict';
var assert = require('assert');
var stripDebug = require('./index');

it('should strip debugger statement', function () {
	assert.equal(stripDebug('function test(){debugger;}'), 'function test(){}');
	assert.equal(stripDebug('"use strict";debugger;foo()'), '"use strict";foo()');
});

it('should strip console statement', function () {
	assert.equal(stripDebug('function test(){console.log();}'), 'function test(){}');
	assert.equal(stripDebug('function test(){window.console.log();}'), 'function test(){}');
	assert.equal(stripDebug('function test(){global.console.log();}'), 'function test(){}');
	assert.equal(stripDebug('"use strict";console.log("foo");foo()'), '"use strict";foo()');
	assert.equal(stripDebug('if(console){global.console.log("foo", "bar");}'), 'if(console){}');
});
