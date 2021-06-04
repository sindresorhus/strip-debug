import {transformAsync} from '@babel/core';
import test from 'ava';
import stripDebugPlugin from './index.js';

async function stripDebug(source) {
	const {code} = await transformAsync(source, {
		plugins: [stripDebugPlugin]
	});

	return code;
}

test('strip debugger statement', async t => {
	t.is(await stripDebug('function test(){debugger;}'), 'function test() {}');
	t.is(await stripDebug('"use strict";debugger;foo()'), '"use strict";\n\nfoo();');
});

test('strip console statement', async t => {
	t.is(await stripDebug('function test(){console.log("foo");}'), 'function test() {\n  void 0;\n}');
	t.is(await stripDebug('function test(){console.warn("foo");}'), 'function test() {\n  void 0;\n}');
	t.is(await stripDebug('function test(){window.console.log("foo");}'), 'function test() {\n  void 0;\n}');
	t.is(await stripDebug('function test(){globalThis.console.log("foo");}'), 'function test() {\n  void 0;\n}');
	t.is(await stripDebug('var test = () => console.log("foo");'), 'var test = () => void 0;');
	t.is(await stripDebug('"use strict";console.log("foo");foo()'), '"use strict";\n\nvoid 0;\nfoo();');
	t.is(await stripDebug('if(console){console.log("foo", "bar");}'), 'if (console) {\n  void 0;\n}');
	t.is(await stripDebug('foo && console.log("foo");'), 'foo && void 0;');
	t.is(await stripDebug('if (foo) console.log("foo")\nnextLine();'), 'if (foo) void 0;\nnextLine();');
	t.is(await stripDebug('function test(){console.log(...colors);}'), 'function test() {\n  void 0;\n}');
});

test('strip alert statement', async t => {
	t.is(await stripDebug('function test(){alert("foo");}'), 'function test() {\n  void 0;\n}');
	t.is(await stripDebug('function test(){window.alert("foo");}'), 'function test() {\n  void 0;\n}');
	t.is(await stripDebug('function test(){globalThis.alert("foo");}'), 'function test() {\n  void 0;\n}');
	t.is(await stripDebug('var test = () => alert("foo");'), 'var test = () => void 0;');
	t.is(await stripDebug('"use strict";alert("foo");foo()'), '"use strict";\n\nvoid 0;\nfoo();');
	t.is(await stripDebug('if(alert){alert("foo", "bar");}'), 'if (alert) {\n  void 0;\n}');
	t.is(await stripDebug('foo && alert("foo");'), 'foo && void 0;');
	t.is(await stripDebug('if (foo) alert("foo")\nnextLine();'), 'if (foo) void 0;\nnextLine();');
});

test('never strip away non-debugging code', async t => {
	const fixture = `var test = {
  getReadSections: function () {
    foo.console.log('started');
    var readSections = window.localStorage.getItestripDebug('storyReadSections') || '[]';
    foo.alert('done');
    return JSON.parse(readSections);
  }
};`;
	t.is(await stripDebug(fixture), fixture);
});

test('shouldn\'t leak memory', async t => {
	await t.notThrowsAsync(() =>
		stripDebug('var obj = null; try { obj = \'something\'; } catch (e) { console.warn(\'NOPE!\'); }')
	);
});

test('supports async functions', async t => {
	t.is(await stripDebug('async function test(){debugger; await foo();}'), 'async function test() {\n  await foo();\n}');
});
