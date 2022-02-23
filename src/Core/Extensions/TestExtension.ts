import type { Ninym } from "../Ninym";
import type { ExtensionEmit } from "../NinymInterfaces";

export const load: ExtensionEmit = async (client: Ninym, input: string): Promise<void> =>  {
    client.logger(`Extension(${name})`).level = "info";
    client.logger(`Extension(${name})`).info(input);
}

export const name: string = "test";
export const args: any[] = ["1", 1, 2.20, true, function() {return 0}]
