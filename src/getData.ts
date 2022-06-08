import { type JSONOutput, ReflectionKind } from 'typedoc';
import type { IDiscordAPIDoc } from './interfaces/typedoc-json';

export const allExports = [
	'gateway/common',
	'globals',
	'payloads/common',
	'rest/common',
	'rpc/common',
	'rpc/v10',
	'rpc/v8',
	'rpc/v9',
	'utils/v10',
	'utils/v8',
	'utils/v9',
	'v10',
	'v6',
	'v8',
	'v9',
	'voice/v4'
];

export const getData = (moduleChildren: JSONOutput.DeclarationReflection[], path: typeof allExports[number]): [IDiscordAPIDoc, string] => {
	const data = moduleChildren.find((child) => child.name === path)!;

	const { children = [] } = data;

	//
	const constants = children
		.filter((child) => child.kind === ReflectionKind.Variable)
		.map((child) => ({ name: child.name, description: child.comment?.shortText }));
	const enums = children
		.filter((child) => child.kind === ReflectionKind.Enum)
		.map((child) => ({ name: child.name, description: child.comment?.shortText }));
	const interfaces = children
		.filter((child) => child.kind === ReflectionKind.Interface)
		.map((child) => ({ name: child.name, description: child.comment?.shortText }));
	const typeAliases = children
		.filter((child) => child.kind === ReflectionKind.TypeAlias)
		.map((child) => ({ name: child.name, description: child.comment?.shortText }));

	const doc = {
		constants,
		enums,
		interfaces,
		typeAliases
	};

	const baseURL = `https://discord-api-types.dev/api/discord-api-types-${path}/`;

	return [doc, baseURL];
};
