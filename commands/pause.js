const { SlashCommandBuilder } = require('@discordjs/builders');
const { Pause } = require('../dispatcher.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pause')
		.setDescription('Pause the song'),
	async execute(interaction) {
		if (interaction) {
			Pause(interaction)
			await interaction.reply('Song paused.') 
		}
	}
}