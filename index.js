const globals = new Set(['window', 'globalThis']);

/**
Collapse `window` and `globalThis`.

@param {import('@babel/core').NodePath} main - Node that may be on a global object.

@returns {import('@babel/core').NodePath} Collapsed node.
*/
function collapseGlobal(main) {
	if (main.isMemberExpression()) {
		const object = main.get('object');
		if (object.isIdentifier() && globals.has(object.node.name) && main.has('property')) {
			return main.get('property');
		}
	}

	return main;
}

/**
@param {import('@babel/core').NodePath<import('@babel/core').CallExpression>} path
*/
function isConsoleNode(path) {
	const expression = path.get('callee');

	if (!expression.isMemberExpression()) {
		return;
	}

	const main = collapseGlobal(expression.get('object'));

	return main.isIdentifier({name: 'console'}) && expression.has('property');
}

/**
@param {import('@babel/core').NodePath<import('@babel/core').CallExpression>} path
*/
function isAlertNode(path) {
	const main = collapseGlobal(path.get('callee'));

	return main.isIdentifier({name: 'alert'});
}

/**
@returns {import('@babel/core').PluginObj}
*/
export default function stripDebugPlugin({types}) {
	return {
		visitor: {
			DebuggerStatement(path) {
				path.remove();
			},
			CallExpression(path) {
				if (isConsoleNode(path) || isAlertNode(path)) {
					path.replaceWith(types.unaryExpression('void', types.numericLiteral(0)));
				}
			},
		},
	};
}
