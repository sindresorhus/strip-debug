'use strict';
var assert = require('assert');
var stripDebug = require('./index');

it('should strip debugger statement', function () {
	assert.equal(stripDebug('function test(){debugger;}').toString(), 'function test(){}');
	assert.equal(stripDebug('"use strict";debugger;foo()').toString(), '"use strict";foo()');
});

it('should strip console statement', function () {
	assert.equal(stripDebug('function test(){console.log("foo");}').toString(), 'function test(){void 0;}');
	assert.equal(stripDebug('function test(){window.console.log("foo");}').toString(), 'function test(){void 0;}');
	assert.equal(stripDebug('"use strict";console.log("foo");foo()').toString(), '"use strict";void 0;foo()');
	assert.equal(stripDebug('if(console){console.log("foo", "bar");}').toString(), 'if(console){void 0;}');
	assert.equal(stripDebug('foo && console.log("foo");').toString(), 'foo && void 0;');
	assert.equal(stripDebug('if (foo) console.log("foo")\nnextLine();').toString(), 'if (foo) void 0\nnextLine();');
});

it('should never strip away non-debugging code', function () {
	var t = 'var test = {\n    getReadSections: function(){\n        var readSections = window.localStorage.getItem(\'storyReadSections\') || \'[]\';\n        return JSON.parse(readSections);\n    }\n};';
	assert.equal(stripDebug(t).toString(), t);
});
