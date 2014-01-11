'use strict';
var rocambole = require('rocambole');
var token = require('rocambole-token');

function removeNode(node) {
	token.eachInBetween(node.startToken, node.endToken, token.remove);
}

function stripDebugger(node) {
	if (node.type === 'DebuggerStatement') {
		removeNode(node);
	}
}

function stripConsole(node) {
	if (node.type !== 'Identifier') {
		return;
	}

	node = node.parent.parent.callee;

	if (!node || node.type !== 'MemberExpression') {
		return;
	}

	if (node.object &&
		node.object.name === 'console' ||
		node.object.object &&
		(node.object.object.name === 'window' ||
		node.object.object.name === 'global')) {
			removeNode(node.parent.parent);
	}
}

module.exports = function (src) {
	src = typeof src === 'string' ? rocambole.parse(src) : src;
	return rocambole.moonwalk(src, function (node) {
		stripDebugger(node);
		stripConsole(node);
	});
};
