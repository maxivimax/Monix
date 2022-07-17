const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Отвечаю понгом на пинг')
    .addUserOption(option => option.setName('user').setDescription('Кого кикнуть?').setRequired(true))
    .addIntegerOption(option => option.setName('days').setDescription('На сколько кикать?').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('А почему ты решил его кикнуть?').setRequired(true)),
	async execute(interaction) {
    const row = new MessageActionRow()
			.addComponents(
        new MessageButton()
          .setCustomId('YES')
          .setLabel('Да')
          .setStyle('SUCCESS'),
        new MessageButton()
          .setCustomId('NO')
          .setLabel('Нет')
          .setStyle('DANGER'),
		);

		await interaction.reply({ content: 'Кикнуть <@' + interaction.options.getUser('user') + '>?', components: [row] });

    const filter = i => i.customId === 'YES' && i.user.id === interaction.options.getUser('user');
    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
    collector.on('collect', async i => {
      interaction.options.getMember('user').ban({ days: interaction.options.getInteger('days'), reason: interaction.options.getString('reason') + ' (От ' + interaction.member.nickname + ")" })
        .then(console.log)
        .catch(console.error);
      await i.update({ content: 'Кикнула <3', components: [] });
    });
    collector.on('end', collected => console.log(`Collected ${collected.size} items`));

    const filterNo = iN => iN.customId === 'NO' && iN.user.id === interaction.options.getUser('user');
    const collectorNo = interaction.channel.createMessageComponentCollector({ filterNo, time: 15000 });
    collectorNo.on('collect', async iN => {
      console.log(iN.customId);
      await iN.update({ content: 'Ты так больше не шути! А то забуду спросить и кикну хорошего человека!', components: [] });
    });
    collectorNo.on('end', collected => console.log(`Collected ${collected.size} items`));
	},
};