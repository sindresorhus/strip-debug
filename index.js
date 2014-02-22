'use strict';
var rocambole = require('rocambole');
var stripDebugger = require('rocambole-strip-debugger');
var stripConsole = require('rocambole-strip-console');

module.exports = function (src) {
	return rocambole.moonwalk(src, function (node) {
		stripDebugger(node);
		stripConsole(node);
	});
};
