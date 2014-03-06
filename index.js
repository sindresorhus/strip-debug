'use strict';
var rocambole = require('rocambole');
var stripDebugger = require('rocambole-strip-debugger');
var stripConsole = require('rocambole-strip-console');
var stripAlert = require('rocambole-strip-alert');

module.exports = function (src) {
	return rocambole.moonwalk(src, function (node) {
		stripDebugger(node);
		stripConsole(node);
		stripAlert(node);
	});
};
