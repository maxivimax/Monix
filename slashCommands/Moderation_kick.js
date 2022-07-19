const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');
const { PermissionFlagsBits } = require('discord-api-types/v10');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Отвечаю понгом на пинг')
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers | PermissionFlagsBits.BanMembers)
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

		await interaction.reply({ content: 'Кикнуть <@' + interaction.options.getUser('user') + '>?', components: [row], ephemeral: true  });

    const filter = i => i = i;
    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
    collector.on('collect', async i => {
      if(i.customId == 'YES'){
        interaction.options.getMember('user').ban({ days: interaction.options.getInteger('days'), reason: interaction.options.getString('reason') + ' (От ' + interaction.member.nickname + ")" })
          .then(console.log)
          .catch(console.error);
        await i.update({ content: 'Кикнула <3', components: [], ephemeral: true });
      } else if (i.customId == 'NO') {
        await i.update({ content: 'Ты так больше не шути! А то забуду спросить и кикну хорошего человека!', components: [], ephemeral: true  });
      }
      
    });
    collector.on('end', collected => console.log(`Collected ${collected.size} items`));
	},
};