import { Client, Events } from 'discord.js';

export const gpt3 = (client: Client): void => {
  client.on(Events.MessageCreate, async (message) => {
    const mess = message.content.split(' ');
    if (mess[0].toLowerCase() === '!gpt') {
      try {
        const msgRef = await message.reply('🤔');
        const data = await global.openai.sendMessage(
          message.content.replace('!gpt', ''),
          {
            onProgress: async (partialResponse: { text: string }) => {
              if (partialResponse.text.trim()) {
                await msgRef.edit(partialResponse.text);
              }
            },
          },
        );
        await msgRef.edit(`\`\`\`\n${data.text}\n\`\`\``);
      } catch (e) {
        await message.reply('Fail');
      }
    }
  });
};
