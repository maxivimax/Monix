const { SlashCommandBuilder } = require('@discordjs/builders');
const music = require('@koenie06/discord.js-music');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Играю песенки в вашем канале')
    .addStringOption(option => option.setName('song').setDescription('Что запустить?').setRequired(true)),
  async execute(interaction) {
    await interaction.deferReply();

    const channel = interaction.member.voice.channel;
    const song = interaction.options.getString('song');

    music.play({
      interaction: interaction,
      channel: channel,
      song: song
    });

    await interaction.editReply('Поставила в очередь ' + interaction.options.getString('song'));
  },
};