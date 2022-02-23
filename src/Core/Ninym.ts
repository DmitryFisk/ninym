import { Client, Collection, Intents } from "discord.js";
import { Config, Extension, NinymOptions } from "./NinymInterfaces";
import { getLogger, Logger } from "log4js";
import { ExtensionsManager } from "./ExtensionsManager";

export class Ninym extends Client {
    private isDebug: boolean = false;
    private config: Config;
    private coreLogger: Logger = this.getNinymLogger("CORE");
    public logger: (loggerName: string) => Logger = this.getNinymLogger;

    public extensions: Collection<string, Extension> = new Collection();

    constructor() {
        super({
            intents: [Intents.FLAGS.GUILDS],
            allowedMentions: { repliedUser: false }
        });
    }

    private getNinymLogger(loggerName: string): Logger {
        const logger: Logger = getLogger(loggerName);
        return logger;
    }

    public async start(options: NinymOptions): Promise<void> {
        this.coreLogger.level = "info";
        this.config = options.config;
        this.isDebug = options.isDebug;

        this.coreLogger.info(`Welcome, ${process.env.USERNAME}`);

        this.login(this.config.token).then(() => {
            new ExtensionsManager(this).loadExtension("TestExtension");
        });
    }
}
