"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmbed = exports.filterCommit = void 0;
const discord_js_1 = require("discord.js");
const lodash_1 = __importDefault(require("lodash"));
function truncateUtf8(str, n) {
    let l = 0;
    let r = '';
    for (let i = 0; i < str.length; i++) {
        const c = str.charCodeAt(i);
        if ((c >= 0x0 && c < 0x81) ||
            c === 0xf8f0 ||
            (c >= 0xff61 && c < 0xffa0) ||
            (c >= 0xf8f1 && c < 0xf8f4)) {
            l += 1;
        }
        else {
            l += 2;
        }
        if (l <= n) {
            r = r.concat(str[i]);
        }
    }
    return r;
}
function truncate2byte(s, n) {
    if (s !== undefined && s !== null) {
        const r = truncateUtf8(s.toString(), n);
        if (r.length !== s.toString().length) {
            return `${r}...`;
        }
        else {
            return r;
        }
    }
    return s;
}
function filterCommit(listIssue, { data }) {
    const filtered = lodash_1.default.filter(data, (item) => {
        const issue = item.commit?.message.match(/#\d+/);
        return (item.committer?.login != 'web-flow' &&
            issue &&
            lodash_1.default.includes(listIssue, issue[0].replace(/\#/, '')));
    });
    const listCommit = lodash_1.default.map(filtered, (item) => {
        const task = item.commit?.message.match(/#\d+/)[0].replace(/\#/, '');
        const message = item.commit?.message;
        const committer = item.committer?.login;
        const sha = item.sha.substring(0, 7);
        return {
            task,
            message,
            committer,
            sha,
        };
    });
    return listCommit;
}
exports.filterCommit = filterCommit;
function createEmbed(title, commit, color) {
    const listMsg = lodash_1.default.map(commit, (item) => `[2;36m${item.message.match(/#\d+/)[0].trim()}[0m ` +
        truncate2byte(`${item.message
            .replace(/refs\s/g, '')
            .replace(/#\d+/g, '')
            .trim()}`, 25)).join('\n');
    const listCommitter = lodash_1.default.map(commit, (item) => `[2;33m${item.committer}[0m`).join('\n');
    const listSHA = lodash_1.default.map(commit, (item) => `[2;34m${item.sha}[0m`).join('\n');
    const embed = new discord_js_1.EmbedBuilder()
        .setTitle(title)
        .addFields([
        {
            name: 'Commit message',
            value: '```ansi\n' + listMsg + '\n```',
            inline: true,
        },
        {
            name: 'Author',
            value: '```ansi\n' + listCommitter + '\n```',
            inline: true,
        },
        {
            name: 'SHA',
            value: '```ansi\n' + listSHA + '\n```',
            inline: true,
        },
    ])
        .setFooter({
        text: 'git cherry-pick ' + lodash_1.default.map(commit, 'sha').reverse().join(' '),
    })
        .setColor(color);
    return embed;
}
exports.createEmbed = createEmbed;
