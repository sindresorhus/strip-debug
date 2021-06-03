const stripFunctionNameList = [
	'alert',
	'window.alert',
	'console.log',
	'window.console.log'
];

export default function stripDebugPlugin({types}) {
	return {
		visitor: {
			DebuggerStatement(path) {
				path.remove();
			},
			CallExpression(path) {
				const isMatched = stripFunctionNameList.some(functionName => {
					const calleePath = path.get('callee');
					if (calleePath.matchesPattern(functionName)) {
						return !calleePath.node.computed;
					}

					return calleePath.node.name === functionName;
				});

				if (isMatched) {
					path.replaceWith(types.unaryExpression('void', types.numericLiteral(0)));
				}
			}
		}
	};
}
