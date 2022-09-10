const { SlashCommandBuilder } = require('@discordjs/builders');

// Thx HMFull (https://www.npmjs.com/package/hmfull)

function hmtaiGet(name) {
  return fetch(`https://hmtai.herokuapp.com/v2/${name}`).then(res => res.json()).catch(err => errMessage(err))
}
function nekosGet(name) {
  return fetch(`https://nekos.life/api/v2/img/${name}`).then(res => res.json()).catch(err => errMessage(err));
}
function nekoloveGet(name) {
  return fetch(`https://neko-love.xyz/api/v1/${name}`).then(res => res.json()).catch(err => errMessage(err))
}
function nekobotGet(name) {
  const blacklist = ['https://i0.nekobot.xyz/0/2/9/1b50d3f619f1bafdf114a530a2570.jpg', 'https://cdn.nekobot.xyz/9/3/9/448bb2ff69b3457a82f32ecd31c06.jpg', 'https://i0.nekobot.xyz/4/9/3/3b6ccf0c081db887fbe38038af996.jpg', 'https://i0.nekobot.xyz/8/6/9/ee21a6ac7d06aabf0b71691e6dfb5.jpg', 'https://cdn.nekobot.xyz/b/4/d/c1fdf4234fbfba326fb282de9ef8c.jpg']
  let res = fetch(`https://nekobot.xyz/api/image?type=${name}`).then(res => res.json()).catch(err => errMessage(err))

  if (!res.success) return false
  if (blacklist.includes(res.message)) return this.nekobotGet(name)

  return { url: res.message }
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('nsfw')
    .setDescription('Название говорит само за себя, малолетний извращуга')
    .addSubcommand(subcommand =>
      subcommand
        .setName('hmtai')
        .setDescription('Images from HMTai')
        .addStringOption(option =>
          option.setName('category')
            .setDescription('The HMTai category')
            .setRequired(true)
            .addChoices(
              { name: 'ass', value: 'ass' },
              { name: 'anal', value: 'anal' },
              { name: 'bdsm', value: 'bdsm' },
              { name: 'classic', value: 'classic' },
              { name: 'cum', value: 'cum' },
              { name: 'creampie', value: 'creampie' },
              { name: 'manga', value: 'manga' },
              { name: 'femdom', value: 'femdom' },

            )))
    .addSubcommand(subcommand =>
      subcommand
        .setName('nekos')
        .setDescription('Images from Nekos')
        .addStringOption(option =>
          option.setName('category')
            .setDescription('The Nekos category')
            .setRequired(true)
            .addChoices(
              { name: 'nekogif', value: 'nekogif' },
              { name: 'wallpaper', value: 'wallpaper' },
            )))
    .addSubcommand(subcommand =>
      subcommand
        .setName('nekolove')
        .setDescription('Images from NekoLove')
        .addStringOption(option =>
          option.setName('category')
            .setDescription('The NekoLove category')
            .setRequired(true)
            .addChoices(
              { name: 'Nekolewd - Neko? Lewd Neko? GIVE ME ALL THAT YOU HAVE!!!', value: 'nekolewd' },
            )))
    .addSubcommand(subcommand =>
      subcommand
        .setName('nekobot')
        .setDescription('Images from NekoBot')
        .addStringOption(option =>
          option.setName('category')
            .setDescription('The NekoBot category')
            .setRequired(true)
            .addChoices(
              { name: 'hentai', value: 'hentai' },
              { name: 'ass', value: 'ass' },
              { name: 'boobs', value: 'boobs' },
              { name: 'paizuri', value: 'paizuri' },
              { name: 'yuri', value: 'yuri' },
              { name: 'thigh', value: 'thigh' },
              { name: 'lewdneko', value: 'lewdneko' },
              { name: 'midriff', value: 'midriff' },
              { name: 'kitsune', value: 'kitsune' },
              { name: 'tentacle', value: 'tentacle' },
              { name: 'anal', value: 'anal' },
              { name: 'hanal', value: 'hanal' },
              { name: 'neko', value: 'neko' },
            ))),
  async execute(interaction) {
    if (interaction.channel.nsfw == true) {
      if (interaction.options.getSubcommand() === 'hmtai') {
        const category = interaction.options.getString('category');
        await interaction.reply("[Ссылка](" + hmtaiGet(category) + ")").catch(console.error);
      } else if (interaction.options.getSubcommand() === 'nekos') {
        const category = interaction.options.getString('category');
        await interaction.reply("[Ссылка](" + nekosGet(category) + ")").catch(console.error);
      } else if (interaction.options.getSubcommand() === 'nekolove') {
        const category = interaction.options.getString('category');
        await interaction.reply("[Ссылка](" + nekoloveGet(category) + ")").catch(console.error);
      } else if (interaction.options.getSubcommand() === 'nekobot') {
        const category = interaction.options.getString('category');
        await interaction.reply("[Ссылка](" + nekobotGet(category) + ")").catch(console.error);
      }
    } else {
      await interaction.reply({ content: "Сэмпай, я не могу сюда это скинуть... Пошли лучше в NSFW канал, там всё покажу", ephemeral: true }).catch(console.error);
    }
  },
};