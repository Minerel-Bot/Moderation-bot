// Importing required packages
const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

// Creating a new Discord client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

// When the bot is ready and logged in
client.once('ready', () => {
  console.log(`${client.user.tag} has logged in.`);
});

// Event: When a message is received
client.on('messageCreate', async (message) => {
  if (message.author.bot) return; // Ignore bot messages

  // Commands can be added here, for example:
  if (message.content.startsWith('!kick')) {
    // Check if the author has the correct permissions
    if (!message.member.permissions.has('KICK_MEMBERS')) {
      return message.reply("You don't have permission to kick members.");
    }

    const user = message.mentions.members.first(); // Get the mentioned user to kick
    if (!user) {
      return message.reply('Please mention a user to kick.');
    }

    try {
      await user.kick('Kicked by bot command');
      message.reply(`${user.user.tag} has been kicked.`);
    } catch (error) {
      console.error(error);
      message.reply('I could not kick that user.');
    }
  }

  if (message.content.startsWith('!ban')) {
    // Check if the author has the correct permissions
    if (!message.member.permissions.has('BAN_MEMBERS')) {
      return message.reply("You don't have permission to ban members.");
    }

    const user = message.mentions.members.first(); // Get the mentioned user to ban
    if (!user) {
      return message.reply('Please mention a user to ban.');
    }

    try {
      await user.ban({ reason: 'Banned by bot command' });
      message.reply(`${user.user.tag} has been banned.`);
    } catch (error) {
      console.error(error);
      message.reply('I could not ban that user.');
    }
  }
});

// Login to Discord with the bot's token
client.login(process.env.TOKEN);
