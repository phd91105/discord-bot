import { cherryPick } from './cherryPick.js';
import { getPublicIP } from './publicIP.js';
export const bootstrap = (client) => {
    cherryPick(client);
    getPublicIP(client);
};
