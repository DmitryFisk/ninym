import { GlobSync, IGlobBase } from "glob";
import { Logger } from "log4js";
import { Ninym } from "../Ninym";
import { Command, ExtensionEmit, Event } from "../NinymInterfaces";

export const load: ExtensionEmit = async (client: Ninym): Promise<void> => {
    const logger: Logger = client.logger("Registrar")

    const commandFiles: IGlobBase = await new GlobSync(`${__dirname}/../../Commands/*.js`);
    commandFiles.found.map(async (value: string) => {
        const file: Command = await import(value);
        client.commands.set(file._registrarName, file);
    });

    const eventFiles: IGlobBase = await new GlobSync(`${__dirname}/../../Events/**/*.js`);
    eventFiles.found.map(async (value: string) => {
        const file: Event = await import(value);
        client.events.set(file.name, file);

        try {
            client.on(file.name, file.run.bind(null, client));
        } catch (err: any) {
            logger.error(`${err.stack}`);
        }
    });
};

export const unload: ExtensionEmit = async (client: Ninym): Promise<void> => {
    client.commands.forEach(async (cmd: Command): Promise<void> => {
        await client.commands.delete(cmd._registrarName);
    });

    client.events.forEach(async (evt: Event): Promise<void> => {
        await client.events.delete(evt.name);
    });
};

export const name: string = "Registrar";
export const args: any[] = [];