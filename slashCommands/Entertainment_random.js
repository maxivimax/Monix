const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('random')
		.setDescription('Даю рандомное число')
    .addNumberOption(option => option.setName('minimum').setDescription('Минимальное число').setRequired(true))
    .addNumberOption(option => option.setName('maximum').setDescription('Максимальное число').setRequired(true)),
	async execute(interaction) {
    var min = 0 + interaction.options.getNumber('minimum');
    var max = interaction.options.getNumber('maximum');

    function getRandom(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }
    
		await interaction.reply('Твое число: ' + getRandom(min, max));
	},
};