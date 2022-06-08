import { type JSONOutput, ReflectionKind } from 'typedoc';
import type { IDiscordAPIDoc } from './interfaces/typedoc-json';

export const getData = (children: JSONOutput.DeclarationReflection[], path: string): [IDiscordAPIDoc, string] => {
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
