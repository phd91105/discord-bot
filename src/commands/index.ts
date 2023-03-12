import { Client } from 'discord.js';

import { bingClient } from './bing';
import { cherryPick } from './cherryPick';

export const bootstrap = (client: Client): void => {
  bingClient(client);
  cherryPick(client);
};
