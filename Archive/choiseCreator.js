Nekossfw = ['pat', 'neko', 'kiss', 'hug', 'feed', 'cuddle', 'smug', 'tickle', 'foxgirl', 'waifu']
Nekosnsfw = ['nekogif', 'wallpaper']

NekoLovesfw = ['pat', 'hug', 'kiss', 'cry', 'slap', 'smug', 'punch', 'neko', 'kitsune', 'waifu']
NekoLovensfw = ['nekolewd']

NekoBotsfw = ['kanna', 'neko', 'holo', 'kemonomimi', 'coffee', 'gah']
NekoBotnsfw = ['hentai', 'ass', 'boobs', 'paizuri', 'yuri', 'thigh', 'lewdneko', 'midriff', 'kitsune', 'tentacle', 'anal', 'hanal', 'neko']

HMTaisfw = ['wave', 'wink', 'tea', 'bonk', 'punch', 'poke', 'bully', 'pat', 'kiss', 'kick', 'blush', 'feed', 'smug', 'hug', 'cuddle', 'cry', 'cringe', 'slap', 'five', 'glomp', 'happy', 'hold', 'nom', 'smile', 'throw', 'lick', 'bite', 'dance', 'boop','sleep', 'like', 'kill', 'tickle', 'nosebleed', 'threaten', 'depression', 'wolf_arts', 'jahy_arts', 'neko_arts', "coffee_arts", 'wallpaper', 'mobileWallpaper']
HMTainsfw = ['ass', 'anal', 'bdsm', 'classic', 'cum', 'creampie', 'manga', 'femdom', 'hentai', 'incest', 'masturbation', 'public', 'ero', 'orgy', 'elves', 'yuri', 'pantsu', 'pussy', 'glasses', 'cuckold', 'blowjob', 'boobjob', 'handjob', 'footjob', 'boobs', 'thighs', 'ahegao', 'uniform', 'gangbang', 'tentacles', 'gif', 'nsfwNeko', 'nsfwMobileWallpaper', 'zettaiRyouiki']

text = ""

HMTainsfw.forEach(element => {
  text = text + "{ name: '" + element + "', value: '" + element + "' },\n"
});

console.log(text);