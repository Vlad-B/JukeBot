const fs = require('fs')
const { Client, Intents, Collection } = require('discord.js')
const { deployCommands } = require('./deploy-commands')

const dotenv = require('dotenv');
dotenv.config()
const token = process.env.DISCORD_TOKEN;
const testGuildId = process.env.TEST_GUILD_ID;

const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_VOICE_STATES
	]
})

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.on('ready', () => {
	client.user.setPresence({activities: [{name: 'music | /help', type: 'PLAYING'}], status: 'online'})
})

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;
	
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(token)
