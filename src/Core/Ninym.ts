import { Client, Intents } from "discord.js";
import { Config, NinymOptions } from "./NinymInterfaces";

export class Ninym extends Client {
    private isDebug: boolean = false;
    private config: Config;

    constructor() {
        super({
            intents: [Intents.FLAGS.GUILDS],
            allowedMentions: { repliedUser: false }
        });
    }

    public async start(options: NinymOptions): Promise<void> {
        // todo: configure log4js
        console.log(`Welcome, ${process.env.USERNAME}`);

        this.config = options.config;
        this.isDebug = options.isDebug;

        this.login(this.config.token).then(() => {
            console.log(`The bot started`);
        });
    }
}
