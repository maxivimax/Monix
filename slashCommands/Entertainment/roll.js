const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Кидаю кубик'),
	async execute(interaction) {
    var min = 1;
    var max = 7;

    function getRandom(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }
    
		await interaction.reply('На кубике выпало ' + getRandom(min, max));
	},
};