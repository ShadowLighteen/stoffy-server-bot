const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log('Успешная авторизация.');
});

client.on("message", async message => {
  console.log(message.guild.name + ` | #` + message.channel.name + ` (` + message.channel.id + `) | ` + message.author.tag + ` (` + message.author.id + `): ` + message.content);
  
  if(message.author.bot) return;
  if(message.content.indexOf(process.env.PREFIX) !== 0) return;
  const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
	
	if(command === "russian") {
    if (message.member.roles.has('473391749381750784')) {
            message.member.removeRole('473391749381750784').catch();
            message.delete();
        } else {
            message.member.addRole('473391749381750784').catch();
            message.delete();
        }
}
	if(command === "english") {
    if (message.member.roles.has('473391718646153226')) {
            message.member.removeRole('473391718646153226').catch();
            message.delete();
        } else {
            message.member.addRole('473391718646153226').catch();
            message.delete();
        }
}

});

client.login(process.env.BOT_TOKEN);