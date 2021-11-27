const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const dotenv = require('dotenv')
dotenv.config()
const clientId = process.env.CLIENT_ID;
const token = process.env.DISCORD_TOKEN;

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

const testGuildId = process.env.TEST_GUILD_ID;

module.exports = {
	deployCommands: async (testGuild) => {
		console.log('Bot is running')
		if(testGuild) {
			await rest.put(Routes.applicationGuildCommands(clientId, testGuildId), { body: commands })
			.then(() => console.log('Successfully registered application commands for development guild.'))
			.catch(console.error);
		} else {
			await rest.put(Routes.applicationCommands(clientId), { body: commands })
			.then(() => console.log('Successfully registered application commands globally.'))
			.catch(console.error);
		}
	}
}