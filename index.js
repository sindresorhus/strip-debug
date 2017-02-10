'use strict';
var rocambole = require('rocambole');
var stripDebugger = require('rocambole-strip-debugger');
var stripConsole = require('rocambole-strip-console');
var stripAlert = require('rocambole-strip-alert');

// esprima@2.1 introduces a "handler" property on TryStatement, so we would
// loop the same node twice (see jquery/esprima/issues/1031 and #264)
rocambole.BYPASS_RECURSION.handler = true;

module.exports = function (src, options) {
	options = options || {};
	return rocambole.moonwalk(src, function (node) {
		options.debugger !== false && stripDebugger(node);
		options.console !== false && stripConsole(node);
		options.alert !== false && stripAlert(node);
	});
};
