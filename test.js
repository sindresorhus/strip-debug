import test from 'ava';
import stripDebug from '.';

test('strip debugger statement', t => {
	t.is(stripDebug('function test(){debugger;}').toString(), 'function test(){}');
	t.is(stripDebug('"use strict";debugger;foo()').toString(), '"use strict";foo()');
});

test('strip console statement', t => {
	t.is(stripDebug('function test(){console.log("foo");}').toString(), 'function test(){void 0;}');
	t.is(stripDebug('function test(){window.console.log("foo");}').toString(), 'function test(){void 0;}');
	t.is(stripDebug('var test = () => console.log("foo");').toString(), 'var test = () => void 0;');
	t.is(stripDebug('"use strict";console.log("foo");foo()').toString(), '"use strict";void 0;foo()');
	t.is(stripDebug('if(console){console.log("foo", "bar");}').toString(), 'if(console){void 0;}');
	t.is(stripDebug('foo && console.log("foo");').toString(), 'foo && void 0;');
	t.is(stripDebug('if (foo) console.log("foo")\nnextLine();').toString(), 'if (foo) void 0\nnextLine();');
});

test('strip alert statement', t => {
	t.is(stripDebug('function test(){alert("foo");}').toString(), 'function test(){void 0;}');
	t.is(stripDebug('function test(){window.alert("foo");}').toString(), 'function test(){void 0;}');
	t.is(stripDebug('var test = () => alert("foo");').toString(), 'var test = () => void 0;');
	t.is(stripDebug('"use strict";alert("foo");foo()').toString(), '"use strict";void 0;foo()');
	t.is(stripDebug('if(alert){alert("foo", "bar");}').toString(), 'if(alert){void 0;}');
	t.is(stripDebug('foo && alert("foo");').toString(), 'foo && void 0;');
	t.is(stripDebug('if (foo) alert("foo")\nnextLine();').toString(), 'if (foo) void 0\nnextLine();');
});

test('never strip away non-debugging code', t => {
	const fixture = 'var test = {\n    getReadSections: function(){\n        var readSections = window.localStorage.getItestripDebug(\'storyReadSections\') || \'[]\';\n        return JSON.parse(readSections);\n    }\n};';
	t.is(stripDebug(fixture).toString(), fixture);
});

test('shouldn\'t leak memory', t => {
	t.notThrows(() => {
		stripDebug('var obj = null; try { obj = \'something\'; } catch (e) { console.warn(\'NOPE!\'); }').toString();
	});
});

test('supports async functions', t => {
	t.is(stripDebug('async function test(){debugger; await foo();}').toString(), 'async function test(){ await foo();}');
});
