const fs = require('node:fs');
const path = require('node:path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, guildId2, token } = require('./config.json');

const commandss = [];

fs.readdirSync('./slashCommands/').forEach(dirs => {
  const commands = fs.readdirSync(`./slashCommands/${dirs}`).filter(files => files.endsWith('.js'));

  for (const file of commands) {
    const filePath = path.join(path.join(__dirname, `slashCommands/${dirs}`), file);
    const command = require(filePath);
    commandss.push(command.data.toJSON());
  };
});

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commandss })
	.then(() => console.log('Successfully registered application commands. 1'))
	.catch(console.error);

rest.put(Routes.applicationGuildCommands(clientId, guildId2), { body: commandss })
	.then(() => console.log('Successfully registered application commands. 2'))
	.catch(console.error);