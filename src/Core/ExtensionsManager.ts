import type { Ninym } from "./Ninym";
import type { Extension } from "./NinymInterfaces";

export class ExtensionsManager {
    private client: Ninym;

    constructor(client: Ninym) {
        this.client = client;
    }

    public async loadExtension(extName: string): Promise<void> {
        const extFile: any = await import(`${__dirname}/Extensions/${extName}.js`);
        this.client.logger("ExtensionsManager").level = "info";
        this.client.logger("ExtensionsManager").info(`${extFile.name} loaded`);
        await extFile.load(this.client, extFile.args);
        this.client.extensions.set(extFile.name, extFile);
    }

    public async unloadExtension(extName: string): Promise<void> {
        const extFile: Extension = this.client.extensions.get(extName);
        this.client.logger("ExtensionsManager").level = "info";
        this.client.logger("ExtensionsManager").info(`${extFile.name} unloaded`);
        await extFile.unload(this.client, extFile.args);
        this.client.extensions.delete(extName);
    }
}