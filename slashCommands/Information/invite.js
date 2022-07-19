const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('invite')
		.setDescription('Кину тебе ссылку чтобы пригласить меня к себе'),
	async execute(interaction) {
		await interaction.reply('Лови <3');
    await interaction.followUp('https://discord.com/api/oauth2/authorize?client_id=850813424979935232&permissions=8&scope=bot%20applications.commands');
	},
};