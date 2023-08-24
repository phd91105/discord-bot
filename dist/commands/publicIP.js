"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPublicIP = void 0;
const discord_js_1 = require("discord.js");
const axios_1 = __importDefault(require("axios"));
const getPublicIP = (client) => {
    const prefix = '!ip';
    client.on(discord_js_1.Events.MessageCreate, async (message) => {
        if (message.content.startsWith(prefix)) {
            try {
                const { data } = await axios_1.default.get('https://api.ipify.org');
                await message.reply(data);
            }
            catch (e) {
                await message.reply('Fail');
            }
        }
    });
};
exports.getPublicIP = getPublicIP;
