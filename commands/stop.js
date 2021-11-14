const { SlashCommandBuilder } = require('@discordjs/builders');
const { Stop } = require('../dispatcher.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Stops playing the song'),
	async execute(interaction) {
		if (interaction) {
			Stop(interaction)
			await interaction.reply('Stopped playing. Good bye :)') 
		}
	}
}