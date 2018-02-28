import test from 'ava';
import m from '.';

test('strip debugger statement', t => {
	t.is(m('function test(){debugger;}').toString(), 'function test(){}');
	t.is(m('"use strict";debugger;foo()').toString(), '"use strict";foo()');
});

test('strip console statement', t => {
	t.is(m('function test(){console.log("foo");}').toString(), 'function test(){void 0;}');
	t.is(m('function test(){window.console.log("foo");}').toString(), 'function test(){void 0;}');
	t.is(m('var test = () => console.log("foo");').toString(), 'var test = () => void 0;');
	t.is(m('"use strict";console.log("foo");foo()').toString(), '"use strict";void 0;foo()');
	t.is(m('if(console){console.log("foo", "bar");}').toString(), 'if(console){void 0;}');
	t.is(m('foo && console.log("foo");').toString(), 'foo && void 0;');
	t.is(m('if (foo) console.log("foo")\nnextLine();').toString(), 'if (foo) void 0\nnextLine();');
});

test('strip alert statement', t => {
	t.is(m('function test(){alert("foo");}').toString(), 'function test(){void 0;}');
	t.is(m('function test(){window.alert("foo");}').toString(), 'function test(){void 0;}');
	t.is(m('var test = () => alert("foo");').toString(), 'var test = () => void 0;');
	t.is(m('"use strict";alert("foo");foo()').toString(), '"use strict";void 0;foo()');
	t.is(m('if(alert){alert("foo", "bar");}').toString(), 'if(alert){void 0;}');
	t.is(m('foo && alert("foo");').toString(), 'foo && void 0;');
	t.is(m('if (foo) alert("foo")\nnextLine();').toString(), 'if (foo) void 0\nnextLine();');
});

test('never strip away non-debugging code', t => {
	const fixture = 'var test = {\n    getReadSections: function(){\n        var readSections = window.localStorage.getItem(\'storyReadSections\') || \'[]\';\n        return JSON.parse(readSections);\n    }\n};';
	t.is(m(fixture).toString(), fixture);
});

test('shouldn\'t leak memory', t => {
	t.notThrows(() => {
		m('var obj = null; try { obj = \'something\'; } catch (e) { console.warn(\'NOPE!\'); }').toString();
	});
});

test('supports async functions', t => {
	t.is(m('async function test(){debugger; await foo();}').toString(), 'async function test(){ await foo();}');
});
