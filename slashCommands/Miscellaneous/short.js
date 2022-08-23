const got = require('got');
const { SlashCommandBuilder } = require('@discordjs/builders');
const regex = /(?:https?|file|ftp):\/\/([^\/\s]+)[^\s]*/ig;

function urlcheck(str) {
  let m;
  
  while ((m = regex.exec(str)) !== null) {
      if (m.index === regex.lastIndex) {
          regex.lastIndex++;
      }
      
      if (m == undefinded) {
        return false;
      } else {
        return true;
      }
  }
}
function str_rand() {
  var result       = '';
  var words        = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
  var max_position = words.length - 1;
      for( i = 0; i < 5; ++i ) {
          position = Math.floor ( Math.random() * max_position );
          result = result + words.substring(position, position + 1);
      }
  return result;
}

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
        )),
	async execute(interaction) {
    const shortLink = interaction.options.getString("shortlink")
    const link = interaction.options.getString("link")
    var shorterLink, response;

    switch(shortLink) {
      case "clckru":
        response = await got('https://clck.ru/--?url=' + link);
        shorterLink = 'Сокращенная ссылка ' + response.body;
        break

      case "cuttly":
        response = await got('http://cutt.ly/api/api.php?key=0e827d574d476866892d7489201f9912993bf&short=' + link + '&name=' + str_rand());
        if (response.body.url.status == 7){
          shorterLink = 'Сокращенная ссылка ' + response.body.url.shortLink;
        } else if (response.body.url.status == 1){
          shorterLink = 'Ты хочешь еще короче чем сейчас?'
        } else if (response.body.url.status == 2){
          shorterLink = 'Чел, это не ссылка...'
        } else if (response.body.url.status == 3){
          shorterLink = 'Мой разраб дурак, попробуй еще раз'
        } else if (response.body.url.status == 4){
          shorterLink = 'Мой разраб дурак, у него ключ не работает'
        } else if (response.body.url.status == 5){
          shorterLink = 'Мистер Сutt.ly не хочет принимать твою ссылку. Глянь, может там символы плохие есть'
        } else if (response.body.url.status == 6){
          shorterLink = 'Чел, где ты нашел эту ссылку? Cutt.ly говорит что она заблокирована'
        }
        break

      case "3leru":
        response = await got('https://3le.ru/api/key=37e914c6&url=' + link);
        shorterLink = 'Сорри, но 3leru сейчас испытывает проблемы с API и сокращенные ссылки поломаны, так что пока что он не работает.';
        break
        
      case "hmru":
        response = await got.post('https://api.hm.ru/key/url/shorten', { json: true, form: false, body: { 'api_key': '7db6927f-4181-423a-81f1-48a2b979a7b1', 'url': link } });
        console.log(response);
        if (response.body.status == 1){
          shorterLink = 'Сокращенная ссылка ' + response.body.data.short_url;
        } else if (response.body.status == -1){
          if (response.body.message == "EMPTY_REQUEST"){
            shorterLink = 'Разраб просто забил, и решил ничего не указывать в запросе...';
          } else if (response.body.message == "MALFORMED_JSON"){
            shorterLink = 'Разраб что-то поломал при обращении к Hmru'
          } else if (response.body.message == "NO_API_KEY"){
            shorterLink = 'Разраб дебил, ключ не указал'
          } else if (response.body.message == "INVALID_API_KEY"){
            shorterLink = 'Мой разраб дурак, у него ключ не работает'
          } else if (response.body.message == "EMPTY_URL"){
            shorterLink = 'Не знаю как у тебя получилось, но ты не указал ссылку'
          } else if (response.body.message == "INCORRECT_URL"){
            shorterLink = 'Hmru говорит что ссылка неверная, попробуй добавить https://, иначе я хз'
          } else if (response.body.message == "BLACKLISTED_DOMAIN"){
            shorterLink = 'Чел, где ты нашел эту ссылку? Hmru говорит что она заблокирована'
          }
        }
        break

      case "goosu":
        shorterLink = 'Сорри, но Goosu перестал работать без VPN. Поэтому не судьба'
        break
    }

    await interaction.reply(shorterLink);
	},
};