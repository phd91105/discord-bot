import { ColorResolvable, EmbedBuilder } from 'discord.js';
import _ from 'lodash';

export function filterCommit(listIssue: any, { data }: any) {
  const filtered = _.filter(data, (item) => {
    const issue = item.commit?.message.match(/#\d+/);

    return (
      item.committer?.login != 'web-flow' &&
      issue &&
      _.includes(listIssue, issue[0].replace(/\#/, ''))
    );
  });

  const listCommit = _.map(filtered, (item) => {
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

export function createEmbed(
  title: string,
  commit: any,
  color: ColorResolvable,
) {
  const listMsg = _.map(commit, (item) =>
    getSubstringByByteLength(item.message.replace('refs ', ''), 35),
  ).join('\n');
  const listCommitter = _.map(commit, (item) =>
    item.committer.replace('bwv-', ''),
  ).join('\n');
  const listSHA = _.map(commit, 'sha').join('\n');

  const embed = new EmbedBuilder()
    .setTitle(title)
    .addFields([
      {
        name: 'Message',
        value: '```\n' + listMsg + '\n```',
        inline: true,
      },
      {
        name: 'Committer',
        value: '```\n' + listCommitter + '\n```',
        inline: true,
      },
      {
        name: 'SHA',
        value: '```\n' + listSHA + '\n```',
        inline: true,
      },
    ])
    .setFooter({
      text: 'git cherry-pick ' + _.map(commit, 'sha').reverse().join(' '),
    })
    .setColor(color);

  return embed;
}

export function getSubstringByByteLength(
  inputString: string,
  byteLength: number,
) {
  let truncatedString = '';
  let currentByteLength = 0;

  for (let i = 0; i < inputString.length; i++) {
    const charCode = inputString.charCodeAt(i);
    const charByteLength = charCode < 0x10000 ? 2 : 4;

    if (currentByteLength + charByteLength <= byteLength) {
      truncatedString += inputString[i];
      currentByteLength += charByteLength;
    } else {
      break;
    }
  }

  return truncatedString;
}
