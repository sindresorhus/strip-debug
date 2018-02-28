'use strict';
const rocambole = require('rocambole');
const stripDebugger = require('rocambole-strip-debugger');
const stripConsole = require('rocambole-strip-console');
const stripAlert = require('rocambole-strip-alert');
const espree = require('espree');

rocambole.parseFn = espree.parse;
rocambole.parseContext = espree;
rocambole.parseOptions = {
	range: true,
	tokens: true,
	comment: true,
	ecmaVersion: 2018,
	ecmaFeatures: {
		jsx: false,
		globalReturn: false,
		impliedStrict: false
	}
};

module.exports = source => rocambole.moonwalk(source, node => {
	stripDebugger(node);
	stripConsole(node);
	stripAlert(node);
});
