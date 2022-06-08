interface IDiscordAPIDocEntry {
	name: string;
	description: string;
}

export interface IDiscordAPIDoc {
	interfaces: IDiscordAPIDocEntry[];
	enums: IDiscordAPIDocEntry[];
}
