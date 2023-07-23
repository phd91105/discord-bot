import { Events } from 'discord.js';
import axios from 'axios';
export const getPublicIP = (client) => {
    const prefix = '!ip';
    client.on(Events.MessageCreate, async (message) => {
        if (message.content.startsWith(prefix)) {
            try {
                const { data } = await axios.get('https://api.ipify.org');
                await message.reply(data);
            }
            catch (e) {
                await message.reply('Fail');
            }
        }
    });
};
