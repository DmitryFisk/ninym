import type { Logger } from "log4js";
import type { Ninym } from "../../Core/Ninym";
import type { EventRun } from "../../Core/NinymInterfaces";

export const run: EventRun = async (client: Ninym): Promise<void> => {
    await client.application.fetch();

    const logger: Logger = client.logger("Bot");

    logger.info(`Started as ${client.user.tag}`);
    client.user.setActivity(`burunyaaa`, { type: "COMPETING" });

    await client.registerSlashCommands();
};

export const name: string = "ready";
