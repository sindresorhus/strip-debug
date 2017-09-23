'use strict';
const rocambole = require('rocambole');
const stripDebugger = require('rocambole-strip-debugger');
const stripConsole = require('rocambole-strip-console');
const stripAlert = require('rocambole-strip-alert');

module.exports = source => rocambole.moonwalk(source, node => {
	stripDebugger(node);
	stripConsole(node);
	stripAlert(node);
});
