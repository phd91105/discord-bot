import { Events } from 'discord.js';
import { Octokit } from '@octokit/core';
import Papa from 'papaparse';
import _ from 'lodash';
import axios from 'axios';
import { filterCommit, createEmbed } from '../utils/index.js';
const octokit = new Octokit({
    auth: process.env.GIT_TOKEN,
});
const url = 'GET /repos/{owner}/{repo}/commits';
const config = {
    owner: process.env.OWNER,
    sha: 'develop',
    per_page: 100,
};
export const cherryPick = (client) => {
    const prefix = '!pick';
    client.on(Events.MessageCreate, async (message) => {
        if (message.content.startsWith(prefix)) {
            const fileUrl = JSON.parse(JSON.stringify(message.attachments))[0]
                .attachment;
            const { data } = await axios.get(fileUrl);
            const parsedData = Papa.parse(data, {
                header: true,
                skipEmptyLines: true,
            });
            const listIssue = _.map(parsedData.data, '#');
            try {
                const [api, front, batch] = await Promise.all([
                    octokit.request(url, {
                        ...config,
                        repo: process.env.API_REPO,
                    }),
                    octokit.request(url, {
                        ...config,
                        repo: process.env.FRONT_REPO,
                    }),
                    octokit.request(url, {
                        ...config,
                        repo: process.env.BATCH_REPO,
                    }),
                ]);
                const commitAPI = filterCommit(listIssue, api);
                const commitFront = filterCommit(listIssue, front);
                const commitBatch = filterCommit(listIssue, batch);
                const embedList = [];
                if (commitAPI.length) {
                    embedList.push(createEmbed(process.env.API_REPO, commitAPI, '#ED4245'));
                }
                if (commitFront.length) {
                    embedList.push(createEmbed(process.env.FRONT_REPO, commitFront, '#1ABC9C'));
                }
                if (commitBatch.length) {
                    embedList.push(createEmbed(process.env.BATCH_REPO, commitBatch, '#FEE75C'));
                }
                await message.reply({ embeds: embedList });
            }
            catch (e) {
                await message.reply('Fail');
            }
        }
    });
};
