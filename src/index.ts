console.clear();

import { Ninym } from "./Core/Ninym";
import * as File from "./config.json";
import type { Config } from "./Core/NinymInterfaces";

new Ninym().start({ config: File as Config, isDebug: true });
