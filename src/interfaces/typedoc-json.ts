interface IDiscordAPIDocEntry {
	name: string;
	description: string;
}

export interface IDiscordAPIDoc {
	Interfaces: IDiscordAPIDocEntry[];
	Enumerations: IDiscordAPIDocEntry[];
}
