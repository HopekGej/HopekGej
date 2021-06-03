const Discord = require('discord.js');
const nodemon = require('nodemon');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL,', 'REACTION'] });
const { token, prefix } = require('./config.js');
const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('komendy').filter(file => file.endsWith('.js'));


client.once('ready', () => {
    console.log('Bot jest online!');
    client.user.setActivity('?help', { type: 'PLAYING' });

});

for (const file of commandFiles) {
    const command = require(`./komendy/${file}`);
    client.commands.set(command.name, command);
}

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'help') {
        client.commands.get('help').execute(message, args, Discord);
    } else if (command === 'ankieta') {
        client.commands.get('ankieta').execute(message, args, Discord);
    } else if (command === 'rr') {
        client.commands.get('rr').execute(message, args, Discord, client);
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("Nie masz uprawnienia żeby użyć tej komendy!❎")
    } else if (command === 'ban') {
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("Nie masz uprawnienia do banowania, przez co nie mozesz użyć tej komendy!❎")
        client.commands.get('ban').execute(message, args,);
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("Nie masz uprawnienia do banowania, przez co nie mozesz użyć tej komendy!❎")
    } else if (command === 'kick') {
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("Nie masz uprawnienia do wyrzucania, przez co nie mozesz użyć tej komendy!❎")
        client.commands.get('kick').execute(message, args,);
    }if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("Nie masz uprawnienia do wyrzucania, przez co nie mozesz użyć tej komendy!❎")
    });

client.login(token)