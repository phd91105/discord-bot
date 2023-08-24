"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cherryPick = void 0;
const discord_js_1 = require("discord.js");
const core_1 = require("@octokit/core");
const papaparse_1 = __importDefault(require("papaparse"));
const lodash_1 = __importDefault(require("lodash"));
const axios_1 = __importDefault(require("axios"));
const utils_1 = require("../utils");
const octokit = new core_1.Octokit({
    auth: process.env.GIT_TOKEN,
});
const url = 'GET /repos/{owner}/{repo}/commits';
const config = {
    owner: process.env.OWNER,
    sha: 'develop',
    per_page: 100,
};
const cherryPick = (client) => {
    const prefix = '!pick';
    client.on(discord_js_1.Events.MessageCreate, async (message) => {
        if (message.content.startsWith(prefix)) {
            const fileUrl = JSON.parse(JSON.stringify(message.attachments))[0]
                .attachment;
            const { data } = await axios_1.default.get(fileUrl);
            const parsedData = papaparse_1.default.parse(data, {
                header: true,
                skipEmptyLines: true,
            });
            const listIssue = lodash_1.default.map(parsedData.data, '#');
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
                const commitAPI = (0, utils_1.filterCommit)(listIssue, api);
                const commitFront = (0, utils_1.filterCommit)(listIssue, front);
                const commitBatch = (0, utils_1.filterCommit)(listIssue, batch);
                const embedList = [];
                if (commitAPI.length) {
                    embedList.push((0, utils_1.createEmbed)(process.env.API_REPO, commitAPI, '#ED4245'));
                }
                if (commitFront.length) {
                    embedList.push((0, utils_1.createEmbed)(process.env.FRONT_REPO, commitFront, '#1ABC9C'));
                }
                if (commitBatch.length) {
                    embedList.push((0, utils_1.createEmbed)(process.env.BATCH_REPO, commitBatch, '#FEE75C'));
                }
                await message.reply({ embeds: embedList });
            }
            catch (e) {
                await message.reply('Fail');
            }
        }
    });
};
exports.cherryPick = cherryPick;
