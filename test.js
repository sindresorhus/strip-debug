'use strict';
var assert = require('assert');
var stripDebug = require('./index');

it('should strip debugger statement', function () {
	assert.equal(stripDebug('function test(){debugger;}').toString(), 'function test(){}');
	assert.equal(stripDebug('"use strict";debugger;foo()').toString(), '"use strict";foo()');
});

it('should strip console statement', function () {
	assert.equal(stripDebug('function test(){console.log();}').toString(), 'function test(){}');
	assert.equal(stripDebug('function test(){window.console.log();}').toString(), 'function test(){}');
	assert.equal(stripDebug('function test(){global.console.log();}').toString(), 'function test(){}');
	assert.equal(stripDebug('"use strict";console.log("foo");foo()').toString(), '"use strict";foo()');
	assert.equal(stripDebug('if(console){global.console.log("foo", "bar");}').toString(), 'if(console){}');
});
