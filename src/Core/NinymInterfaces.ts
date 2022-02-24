import type { CommandInteraction, Message } from "discord.js";
import type { Ninym } from "./Ninym";

export interface ExtensionEmit {
    (client: Ninym, ...args: any[]): Promise<void>;
}

export interface Config {
    token: string;
}

export interface EventRun {
    (client: Ninym, ...args: any[]): Promise<void>;
}

export interface CommandRun {
    (client: Ninym, interaction: CommandInteraction): Promise<void | Message>;
}

export interface NinymOptions {
    config: Config;
    isDebug: boolean;
}

export interface Extension {
    name: string;
    args: any[];
    load: ExtensionEmit;
    unload: ExtensionEmit;
}

export interface Event {
    run: EventRun;
    name: string;
}

export interface Command {
    run: CommandRun;
    _registrarName: string;
    builderData: object;
}
