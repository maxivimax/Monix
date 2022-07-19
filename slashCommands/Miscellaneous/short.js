const { request } = require('urllib');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('short')
		.setDescription('Сокращу тебе ссылку')
    .addStringOption(option => option.setName('link').setDescription('Какую ссылку сократить?').setRequired(true))
    .addStringOption(option =>
      option.setName('shortlink')
        .setDescription('Какая сокращенная ссылка тебе больше нравится?')
        .setRequired(true)
        .addChoices(
          { name: 'clck.ru', value: 'clckru' },
          { name: 'cutt.ly', value: 'cuttly' },
          { name: '3le.ru', value: '3leru' },
          { name: 'hm.ru', value: 'hmru' },
          { name: 'goo.su', value: 'goosu' },
          { name: 'cutt.us', value: 'cuttus' },
        )),
	async execute(interaction) {
    const shortLink = interaction.options.getString("shortlink")
    const link = interaction.options.getString("link")

    const { data, res } = await request('https://clck.ru/--', {
      method: 'GET',
      data: {
        'url': link
      }
    });
    console.log(res);
		await interaction.reply('Сокращенная ссылка ' + res.text.toString());
	},
};