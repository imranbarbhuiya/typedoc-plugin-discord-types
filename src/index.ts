import type { Application } from 'typedoc';
import { request } from 'undici';
import type { IDiscordAPIDoc } from './interfaces/typedoc-json';

const availableVersions = ['v6', 'v8', 'v9', 'v10'];

export const load = async (app: Application) => {
	const res = await request(
		'https://raw.githubusercontent.com/discordjs/discord-api-types/main/website/versioned_docs/version-0.33.5/api-typedoc.json'
	);

	if (res.statusCode !== 200) {
		app.logger.verbose('Failed to load API documentation');
		return;
	}

	const data = (await res.body.json()) as IDiscordAPIDoc;

	const baseURL = (v: typeof availableVersions[number]) => `https://discord-api-types.dev/api/discord-api-types-${v}/`;

	for (const version of availableVersions)
		app.renderer.addUnknownSymbolResolver(`discord-api-types/${version}`, (name) => {
			const versionedBaseURL = baseURL(version);
			if (data.Interfaces.find((c) => c.name === name)) {
				return `${versionedBaseURL}/interface/${name}`;
			}
			if (data.Enumerations.find((c) => c.name === name)) {
				return `${versionedBaseURL}/enum/${name}`;
			}

			return undefined;
		});
};
