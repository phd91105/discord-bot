"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = void 0;
const cherryPick_1 = require("./cherryPick");
const publicIP_1 = require("./publicIP");
const bootstrap = (client) => {
    (0, cherryPick_1.cherryPick)(client);
    (0, publicIP_1.getPublicIP)(client);
};
exports.bootstrap = bootstrap;
