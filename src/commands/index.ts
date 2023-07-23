import { Client } from 'discord.js';

import { bingClient } from './bing';
import { cherryPick } from './cherryPick';
import { getPublicIP } from './publicIP';

export const bootstrap = (client: Client): void => {
  bingClient(client);
  cherryPick(client);
  getPublicIP(client);
};
