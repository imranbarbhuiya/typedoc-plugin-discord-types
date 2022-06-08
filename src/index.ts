import type { Application, JSONOutput } from 'typedoc';
import { request } from 'undici';
import { allExports, getData } from './getData';

export const load = async (app: Application) => {
	const res = await request(
		'https://raw.githubusercontent.com/discordjs/discord-api-types/main/website/versioned_docs/version-0.33.5/api-typedoc.json'
	);

	if (res.statusCode !== 200) {
		app.logger.verbose('Failed to load API documentation');
		return;
	}

	const data = (await res.body.json()) as JSONOutput.ProjectReflection;

	for (const version of allExports)
		app.renderer.addUnknownSymbolResolver(`discord-api-types/${version}`, (name) => {
			const [doc, baseURL] = getData(data.children!, version);
			if (doc.constants.find((c) => c.name === name)) {
				return `${baseURL}/${name}`;
			}
			if (doc.enums.find((c) => c.name === name)) {
				return `${baseURL}/enum/${name}`;
			}
			if (doc.interfaces.find((c) => c.name === name)) {
				return `${baseURL}/interface/${name}`;
			}
			if (doc.typeAliases.find((c) => c.name === name)) {
				return `${baseURL}/${name}`;
			}

			return undefined;
		});
};
