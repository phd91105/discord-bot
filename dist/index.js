import { exit } from 'process';
import { client } from './app.js';
const main = async () => {
    try {
        client.on('ready', () => {
            console.log(`> Bot is on ready`);
        });
    }
    catch (error) {
        console.error(error);
        exit(0);
    }
};
main();
