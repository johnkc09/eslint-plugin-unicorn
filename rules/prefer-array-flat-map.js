'use strict';
const getDocumentationUrl = require('./utils/get-documentation-url');
const isMethodNamed = require('./utils/is-method-named');
const isLiteralValue = require('./utils/is-literal-value');
const {isNodeMatches} = require('./utils/is-node-matches');

const MESSAGE_ID_FLATMAP = 'flat-map';
const MESSAGE_ID_SPREAD = 'spread';
const messages = {
	[MESSAGE_ID_FLATMAP]: 'Prefer `.flatMap(…)` over `.map(…).flat()`.',
	[MESSAGE_ID_SPREAD]: 'Prefer `.flatMap(…)` over `[].concat(...foo.map(…))`.'
};

const SELECTOR_SPREAD = [
	// [].concat(...bar.map((i) => i))
	// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
	'CallExpression',

	// [].concat(...bar.map((i) => i))
	// ^^
	'[callee.object.type="ArrayExpression"]',
	'[callee.object.elements.length=0]',

	// [].concat(...bar.map((i) => i))
	//    ^^^^^^
	'[callee.type="MemberExpression"]',
	'[callee.computed=false]',
	'[callee.property.type="Identifier"]',
	'[callee.property.name="concat"]',

	// [].concat(...bar.map((i) => i))
	//           ^^^^^^^^^^^^^^^^^^^^
	'[arguments.0.type="SpreadElement"]',

	// [].concat(...bar.map((i) => i))
	//              ^^^^^^^^^^^^^^^^^
	'[arguments.0.argument.type="CallExpression"]',

	// [].concat(...bar.map((i) => i))
	//              ^^^^^^^
	'[arguments.0.argument.callee.type="MemberExpression"]',
	'[arguments.0.argument.callee.computed=false]',

	// [].concat(...bar.map((i) => i))
	//                  ^^^
	'[arguments.0.argument.callee.property.type="Identifier"]',
	'[arguments.0.argument.callee.property.name="map"]'
].join('');

const reportFlatMap = (context, nodeFlat, nodeMap) => {
	const source = context.getSourceCode();

	// Node covers:
	//   map(…).flat();
	//          ^^^^
	//   (map(…)).flat();
	//            ^^^^
	const flatIdentifer = nodeFlat.callee.property;

	// Location will be:
	//   map(…).flat();
	//         ^
	//   (map(…)).flat();
	//           ^
	const dot = source.getTokenBefore(flatIdentifer);

	// Location will be:
	//   map(…).flat();
	//                ^
	//   (map(…)).flat();
	//                  ^
	const maybeSemicolon = source.getTokenAfter(nodeFlat);
	const hasSemicolon = Boolean(maybeSemicolon) && maybeSemicolon.value === ';';

	// Location will be:
	//   (map(…)).flat();
	//          ^
	const tokenBetween = source.getLastTokenBetween(nodeMap, dot);

	// Location will be:
	//   map(…).flat();
	//        ^
	//   (map(…)).flat();
	//          ^
	const beforeSemicolon = tokenBetween || nodeMap;

	// Location will be:
	//   map(…).flat();
	//               ^
	//   (map(…)).flat();
	//                 ^
	const fixEnd = nodeFlat.range[1];

	// Location will be:
	//   map(…).flat();
	//         ^
	//   (map(…)).flat();
	//           ^
	const fixStart = dot.range[0];

	const mapProperty = nodeMap.callee.property;

	context.report({
		node: nodeFlat,
		messageId: MESSAGE_ID_FLATMAP,
		* fix(fixer) {
			// Removes:
			//   map(…).flat();
			//         ^^^^^^^
			//   (map(…)).flat();
			//           ^^^^^^^
			yield fixer.removeRange([fixStart, fixEnd]);

			// Renames:
			//   map(…).flat();
			//   ^^^
			//   (map(…)).flat();
			//    ^^^
			yield fixer.replaceText(mapProperty, 'flatMap');

			if (hasSemicolon) {
				// Moves semicolon to:
				//   map(…).flat();
				//         ^
				//   (map(…)).flat();
				//           ^
				yield fixer.insertTextAfter(beforeSemicolon, ';');
				yield fixer.remove(maybeSemicolon);
			}
		}
	});
};

const create = context => ({
	CallExpression: node => {
		if (!isMethodNamed(node, 'flat')) {
			return;
		}

		if (
			!(
				// `.flat()`
				node.arguments.length === 0 ||
				// `.flat(1)`
				(node.arguments.length === 1 && isLiteralValue(node.arguments[0], 1))
			)
		) {
			return;
		}

		const calleeObject = node.callee.object;
		if (
			!isMethodNamed(calleeObject, 'map') ||
			isNodeMatches(calleeObject.callee.object, ['React.Children', 'Children'])
		) {
			return;
		}

		reportFlatMap(context, node, calleeObject);
	},
	[SELECTOR_SPREAD]: node => {
		context.report({
			node,
			messageId: MESSAGE_ID_SPREAD
		});
	}
});

module.exports = {
	create,
	meta: {
		type: 'suggestion',
		docs: {
			description: 'Prefer `.flatMap(…)` over `.map(…).flat()`.',
			url: getDocumentationUrl(__filename)
		},
		fixable: 'code',
		messages,
		schema: []
	}
};
