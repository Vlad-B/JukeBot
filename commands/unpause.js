const { SlashCommandBuilder } = require('@discordjs/builders');
const { Unpause } = require('../dispatcher.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unpause')
		.setDescription('Resume playing.'),
	async execute(interaction) {
		if (interaction) {
			Unpause(interaction)
			await interaction.reply('Resumed playing your song.') 
		}
	}
}