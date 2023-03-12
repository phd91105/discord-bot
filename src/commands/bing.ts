import { Client, Events } from 'discord.js';

import { bingChat } from '../config';

export const bingClient = (client: Client): void => {
  const botId = '<@807105325114720257>';
  client.on(Events.MessageCreate, async (message) => {
    if (message.content.startsWith(botId)) {
      const id = message.author.id;
      const msgRef = await message.reply('🤔');
      try {
        const data = await bingChat(message.content.replace(botId, ''), id);
        await msgRef.edit(data);
      } catch (e) {
        await msgRef.edit('Fail');
      }
    }
  });
};
