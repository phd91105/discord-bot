"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
require("dotenv/config");
const discord_js_1 = require("discord.js");
const commands_1 = require("./commands");
const { Guilds, MessageContent, GuildMessages, GuildMembers } = discord_js_1.GatewayIntentBits;
const client = new discord_js_1.Client({
    intents: [Guilds, MessageContent, GuildMessages, GuildMembers],
});
exports.client = client;
client.login(process.env.TOKEN).then(() => {
    (0, commands_1.bootstrap)(client);
});
