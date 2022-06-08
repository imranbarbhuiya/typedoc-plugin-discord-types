interface IDiscordAPIDocEntry {
	name: string;
	description: string | undefined;
}

export interface IDiscordAPIDoc {
	constants: IDiscordAPIDocEntry[];
	enums: IDiscordAPIDocEntry[];
	interfaces: IDiscordAPIDocEntry[];
	typeAliases: IDiscordAPIDocEntry[];
}
