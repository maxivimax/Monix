const fs = require('node:fs');
const path = require('node:path');
const music = require('@koenie06/discord.js-music');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
fs.readdirSync('./slashCommands/').forEach(dirs => {
  const commands = fs.readdirSync(`./slashCommands/${dirs}`).filter(files => files.endsWith('.js'));

  for (const file of commands) {
    const filePath = path.join(path.join(__dirname, `slashCommands/${dirs}`), file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
  };
});

client.once('ready', () => {
	console.log('Готова к труду и обороне!');
});

// Ивенты музыки
music.event.on('playSong', (channel, songInfo, requester) => {
	channel.send({ content: `Запустила [${songInfo.title}](${songInfo.url}) - ${songInfo.duration} (Кстати, попросил меня об этом \`${requester.tag}\`)` });
});
music.event.on('addSong', (channel, songInfo, requester) => {
	channel.send({ content: `Добавила в список [${songInfo.title}](${songInfo.url}) - ${songInfo.duration} Спасибо, \`${requester.tag}\`` });
});
music.event.on('playList', async (channel, playlist, songInfo, requester) => {
    channel.send({
        content: `Слушаем [${songInfo.title}](${songInfo.url}) из ${playlist.title}.
        This was requested by ${requester.tag} (${requester.id})`
    });
});
music.event.on('addList', async (channel, playlist, requester) => {
    channel.send({
        content: `Добавила плейлист [${playlist.title}](${playlist.url}).
        Кинул его мне ${requester.tag} (${requester.id})`
    });
});
music.event.on('finish', (channel) => {
	channel.send({ content: `Музыка кончилась :( Пока!` });
});

// "/" команды
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'Чел, я не могу запустить эту команду... Глянь, мб ты там что-то не так сделал?', ephemeral: true });
	}
});

client.login(token);