'use strict';
const {findVariable} = require('eslint-utils');
const avoidCapture = require('./utils/avoid-capture');
const getDocumentationUrl = require('./utils/get-documentation-url');
const renameVariable = require('./utils/rename-variable');
const methodSelector = require('./utils/method-selector');

const MESSAGE_ID = 'catch-error-name';
const messages = {
	[MESSAGE_ID]: 'The catch parameter `{{originalName}}` should be named `{{fixedName}}`.'
};

const promiseMethodSelector = (method, argumentsLength, argumentIndex) => [
	methodSelector({
		name: method,
		length: argumentsLength
	}),
	`:matches(${
		[
			'FunctionExpression',
			'ArrowFunctionExpression'
		].map(type => `[arguments.${argumentIndex}.type="${type}"]`).join(', ')
	})`,
	`[arguments.${argumentIndex}.params.length=1]`,
	`[arguments.${argumentIndex}.params.0.type="Identifier"]`
].join('');

// Matches `promise.catch([FunctionExpression | ArrowFunctionExpression])`
const promiseCatchSelector = promiseMethodSelector('catch', 1, 0);

// Matches `promise.then(any, [FunctionExpression | ArrowFunctionExpression])`
const promiseThenSelector = promiseMethodSelector('then', 2, 1);

const catchSelector = [
	'CatchClause',
	'>',
	'Identifier.param'
].join('');

const create = context => {
	const {ecmaVersion} = context.parserOptions;

	const options = {
		name: 'error',
		ignore: [],
		...context.options[0]
	};
	const {name: expectedName} = options;
	const ignore = options.ignore.map(
		pattern => pattern instanceof RegExp ? pattern : new RegExp(pattern, 'u')
	);
	const isNameAllowed = name =>
		name === expectedName ||
		ignore.some(regexp => regexp.test(name)) ||
		name.endsWith(expectedName) ||
		name.endsWith(expectedName.charAt(0).toUpperCase() + expectedName.slice(1));

	function check(node) {
		const originalName = node.name;

		if (
			isNameAllowed(originalName) ||
			isNameAllowed(originalName.replace(/_+$/g, ''))
		) {
			return;
		}

		const scope = context.getScope();
		const variable = findVariable(scope, node);

		// This was reported https://github.com/sindresorhus/eslint-plugin-unicorn/issues/1075#issuecomment-768072967
		// But can't reproduce, just ignore this case
		/* istanbul ignore next */
		if (!variable) {
			return;
		}

		if (originalName === '_' && variable.references.length === 0) {
			return;
		}

		const scopes = [
			variable.scope,
			...variable.references.map(({from}) => from)
		];
		const fixedName = avoidCapture(expectedName, scopes, ecmaVersion);

		context.report({
			node,
			messageId: MESSAGE_ID,
			data: {
				originalName,
				fixedName
			},
			fix: fixer => renameVariable(variable, fixedName, fixer)
		});
	}

	return {
		[promiseCatchSelector]: node => {
			check(node.arguments[0].params[0]);
		},
		[promiseThenSelector]: node => {
			check(node.arguments[1].params[0]);
		},
		[catchSelector]: node => {
			check(node);
		}
	};
};

const schema = [
	{
		type: 'object',
		properties: {
			name: {
				type: 'string'
			},
			ignore: {
				type: 'array',
				uniqueItems: true
			}
		}
	}
];

module.exports = {
	create,
	meta: {
		type: 'suggestion',
		docs: {
			description: 'Enforce a specific parameter name in catch clauses.',
			url: getDocumentationUrl(__filename)
		},
		fixable: 'code',
		schema,
		messages
	}
};
