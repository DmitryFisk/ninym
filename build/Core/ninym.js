"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ninym = void 0;
const discord_js_1 = require("discord.js");
class Ninym extends discord_js_1.Client {
    constructor() {
        super({
            intents: [discord_js_1.Intents.FLAGS.GUILDS],
            allowedMentions: { repliedUser: false }
        });
        this.isDebug = false;
    }
    async start(options) {
        // todo: configure log4js
        console.log(`Welcome, ${process.env.USERNAME}`);
        this.config = options.config;
        this.isDebug = options.isDebug;
        this.login(this.config.token).then(() => {
            console.log(`The bot started`);
        });
    }
}
exports.Ninym = Ninym;
