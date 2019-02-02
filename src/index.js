'use strict';

export default function ({types: t}) {
	return {
		visitor: {
			DebuggerStatement(path) {
				path.remove();
			},
			CallExpression(path) {
				const stripFunctionNameList = this.opts.strip || [];
				const isMatched = stripFunctionNameList.some(fnName => {
					const calleePath = path.get('callee');
					if (calleePath.matchesPattern(fnName)) {
						return !calleePath.node.computed;
					}
					return calleePath.node.name === fnName;
				});
				if (isMatched) {
					path.replaceWith(t.unaryExpression('void', t.numericLiteral(0))
					);
				}
			}
		}
	};
}
