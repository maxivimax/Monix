const { SlashCommandBuilder } = require('@discordjs/builders');
const music = require('@koenie06/discord.js-music');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Играю песенки в вашем канале')
    .addStringOption(option => option.setName('song').setDescription('Что запустить?').setRequired(true)),
  async execute(interaction) {
    const song = interaction.options.getString('song');

    const voiceChannel = interaction.member.voice.channel;

    music.play({
        interaction: interaction,
        channel: voiceChannel,
        song: song
    });

    await interaction.reply('Поставила в очередь ' + interaction.options.getString('song'));
  },
};