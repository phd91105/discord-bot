import { bingClient } from './bing.js';
import { cherryPick } from './cherryPick.js';
import { getPublicIP } from './publicIP.js';
export const bootstrap = (client) => {
    bingClient(client);
    cherryPick(client);
    getPublicIP(client);
};
