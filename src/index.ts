import { client } from './app';

const main = async () => {
  try {
    client.on('ready', () => {
      console.log(`> Bot is on ready`);
    });
  } catch (error) {
    console.error(error);
  }
};

main();
