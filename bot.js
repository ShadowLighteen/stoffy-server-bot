const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log('[SYSTEM] Успешная авторизация.');
});

client.on("guildMemberAdd", (member) => {
  console.log(`New User "${member.user.username}" has joined "${member.guild.name}"` );
  client.channels.get("474597789305929738").send(`"${member.user.username}" зашёл на сервер. Пожалуйста, понефрите.`);
});

client.on('messageDelete', async (message) => {
  const logs = message.guild.channels.find('name', 'logs');
  if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
    message.guild.createChannel('logs', 'text');
  }
  if (!message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) { 
    console.log('The logs channel does not exist and tried to create the channel but I am lacking permissions')
  }  
  let user = ""
    if (entry.extra.channel.id === message.channel.id
      && (entry.target.id === message.author.id)
      && (entry.createdTimestamp > (Date.now() - 5000))
      && (entry.extra.count >= 1)) {
    user = entry.executor.username
  } else { 
    user = message.author.username
  }
  logs.send(`Удалено сообщение в канале <#${message.channel.id}> пользователем ${user}`);
});

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

client.on("message", async message => {
	const prefixMention = new RegExp(`^<@!?${client.user.id}> `);
  process.env.PREFIX = prefixMention.match(message.content) ? message.content.match(prefixMention)[0] + " " : process.env.PREFIX;
  console.log(`[SPY] | #` + message.channel.name + ` | ` + message.author.tag + `: ` + message.content);
  
  if(message.author.bot) return;
  const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
	
	const swearWords = ['anal',
'anus',
'arse',
'ass',
'ballsack',
'balls',
'bastard',
'bitch',
'biatch',
'bloody',
'blowjob',
'blow job',
'bollock',
'bollok',
'boner',
'boob',
'bugger',
'bum',
'butt',
'buttplug',
'clitoris',
'cock',
'coon',
'crap',
'cunt',
'damn',
'dick',
'dildo',
'dyke',
'fag',
'feck',
'fellate',
'fellatio',
'felching',
'fuck',
'f u c k',
'fudgepacker',
'fudge packer',
'flange',
'Goddamn',
'God damn',
'hell',
'homo',
'jerk',
'jizz',
'knobend',
'knob end',
'labia',
'lmao',
'lmfao',
'muff',
'nigger',
'nigga',
'omg',
'penis',
'piss',
'poop',
'prick',
'pube',
'pussy',
'queer',
'scrotum',
'sex',
'shit',
's hit',
'sh1t',
'slut',
'smegma',
'spunk',
'tit',
'tosser',
'turd',
'twat',
'vagina',
'wank',
'whore',
'wtf'];
if( swearWords.some(word => message.content.includes(word)) ) {
	message.delete();
  message.reply("следите за своими словами");
}
	
	if (message.content === process.env.PREFIX + "msgpurge") {
		let err = false;
['MANAGE_MESSAGES'].forEach(function (item) {
            if (!message.member.hasPermission(item, false, true, true)) {
                err = true;
            }
        });
if (err) return message.reply("у Вас нету доступа для совершения этого действия");
	const user = message.mentions.users.first();
const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])
if (!amount) return message.reply('необходимо указать число для удаления');
if (!amount && !user) return message.reply('необходимо указать пользователя и число или просто количество сообщений для очистки');
message.channel.fetchMessages({
 limit: amount,
}).then((messages) => {
 if (user) {
 const filterBy = user ? user.id : Client.user.id;
 messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
 }
 message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
});
	}

  if (message.content === process.env.PREFIX + "eval") {
    if(message.author.id !== "178404926869733376") return message.reply("у Вас нету доступа для совершения этого действия");
    try {
      const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }
	
	if(message.content === process.env.PREFIX + "silentkick") {
		let err = false;
['KICK_MEMBERS'].forEach(function (item) {
            if (!message.member.hasPermission(item, false, true, true)) {
                err = true;
            }
        });
if (err) return message.reply("у Вас нету доступа для совершения этого действия");
  let member = message.mentions.members.first();
  member.kick();
  message.delete();
}
	
	if(message.content === process.env.PREFIX + "kick") {
		let err = false;
['KICK_MEMBERS'].forEach(function (item) {
            if (!message.member.hasPermission(item, false, true, true)) {
                err = true;
            }
        });
if (err) return message.reply("у Вас нету доступа для совершения этого действия");
  let member = message.mentions.members.first();
let reason = args.slice(1).join(" ");
  member.kick(reason);
  message.channel.send(`Успешно забанен пользователь ${member.tag} модератором ${message.author} | Причина: ${reason}`);
}
	
	if(command === "say"){
		let err = false;
['ADMINISTRATOR'].forEach(function (item) {
            if (!message.member.hasPermission(item, false, true, true)) {
                err = true;
            }
        });
if (err) return message.reply("у Вас нету доступа для совершения этого действия");
  let text = args.slice(1).join(" ");
  message.delete();
  message.channel.send(text);
}
	
	if(message.content === process.env.PREFIX + "russian") {
    if (message.member.roles.has('473767322130317313')) {
            message.member.removeRole('473767322130317313').catch();
            message.delete();
        } else {
            message.member.addRole('473767322130317313').catch();
            message.delete();
        }
}
	if(message.content === process.env.PREFIX + "english") {
    if (message.member.roles.has('473767413406498817')) {
            message.member.removeRole('473767413406498817').catch();
            message.delete();
        } else {
            message.member.addRole('473767413406498817').catch();
            message.delete();
        }
}

});

client.login(process.env.BOT_TOKEN);
