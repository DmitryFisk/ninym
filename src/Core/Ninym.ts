import { Client, Collection, Intents } from "discord.js";
import type { Command, Config, Extension, NinymOptions, Event } from "./NinymInterfaces";
import { getLogger, Logger, configure } from "log4js";
import { ExtensionsManager } from "./ExtensionsManager";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";

export class Ninym extends Client {
    private isDebug: boolean = false;
    private config: Config;
    private coreLogger: Logger = this.getNinymLogger("Core");
    public logger: (loggerName: string) => Logger = this.getNinymLogger;

    public extensions: Collection<string, Extension> = new Collection();
    public commands: Collection<string, Command> = new Collection();
    public events: Collection<string, Event> = new Collection();

    constructor() {
        super({
            intents: [Intents.FLAGS.GUILDS],
            allowedMentions: { repliedUser: false }
        });
    }

    private getNinymLogger(loggerName: string): Logger {
        configure({
            appenders: {
                console: { type: "stdout" },
                file: { type: "file", filename: "log.txt" }
            },
            categories: {
                default: {
                    appenders: ["console", "file"],
                    level: "debug"
                }
            }
        });
        
        return getLogger(loggerName);
    }

    public async start(options: NinymOptions): Promise<void> {
        this.config = options.config;
        this.isDebug = options.isDebug;

        this.coreLogger.info(`Welcome, ${process.env.USERNAME}`);

        if (this.isDebug) {
            this.coreLogger.debug(`DEBUG MODE`);
        }

        this.login(this.isDebug ? this.config.debugToken : this.config.token).then(() => {
            const extManager = new ExtensionsManager(this);
            extManager.loadExtension("Registrar");
        });
    }

    public async registerSlashCommands(): Promise<void> {
        const commands: object[] = this.commands.map(
            ({ run, ...data }: Command): object => data.builderData
        );
        const rest = new REST({ version: "9" }).setToken(this.isDebug ? this.config.debugToken : this.config.token);

        (async (): Promise<void> => {
            try {
                this.coreLogger.info(`Started refreshing application (/) commands`);

                await rest.put(
                    this.isDebug
                        ? Routes.applicationGuildCommands(this.user.id, "818556791633739826")
                        : Routes.applicationCommands(this.user.id),
                    { body: commands }
                );

                this.coreLogger.info(`Successfully reloaded application (/) commands`);
            } catch (err: any) {
                this.coreLogger.error(err.stack);
            }
        })();
    }
}
