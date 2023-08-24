"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
const app_1 = require("./app");
const main = async () => {
    try {
        app_1.client.on('ready', () => {
            console.log(`> Bot is on ready`);
        });
    }
    catch (error) {
        console.error(error);
        (0, process_1.exit)(0);
    }
};
main();
