const { SlashCommandBuilder } = require('@discordjs/builders');
const { checkPerms, voiceChannel, player } = require('./play')
const { Stop } = require('../dispatcher.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Stops playing the song'),
	async execute(interaction) {
		if (player._state.status === 'idle') return interaction.reply('The player is not currently playing anything. Use the following syntax to add a song:\n/play <song-title>')
		checkPerms(interaction, voiceChannel(interaction))

		if (interaction) {
			Stop(interaction)
			await interaction.reply('Stopped playing. Good bye :)') 
		}
	}
}