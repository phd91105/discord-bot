import { Client } from 'discord.js';

import { cherryPick } from './cherryPick';
import { getPublicIP } from './publicIP';

export const bootstrap = (client: Client): void => {
  cherryPick(client);
  getPublicIP(client);
};
