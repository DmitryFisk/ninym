import type { Logger } from "log4js";
import type { Ninym } from "./Ninym";
import type { Extension } from "./NinymInterfaces";

export class ExtensionsManager {
    private client: Ninym;
    private logger: Logger;

    constructor(client: Ninym) {
        this.client = client;
        this.logger = client.logger("ExtensionsManager");
        this.logger.level = "info";
    }

    public async loadExtension(extName: string): Promise<void> {
        const extFile: any = await import(`${__dirname}/Extensions/${extName}.js`);
        this.logger.info(`${extFile.name} loaded`);
        await extFile.load(this.client, extFile.args);
        this.client.extensions.set(extFile.name, extFile);
    }

    public async unloadExtension(extName: string): Promise<void> {
        const extFile: Extension = this.client.extensions.get(extName);
        this.logger.info(`${extFile.name} unloaded`);
        await extFile.unload(this.client, extFile.args);
        this.client.extensions.delete(extName);
    }
}
