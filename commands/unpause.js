const { SlashCommandBuilder } = require('@discordjs/builders');
const { checkPerms, voiceChannel, player } = require('./play')
const { Unpause } = require('../dispatcher.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('resume')
		.setDescription('Resume playing.'),
	async execute(interaction) {
		if (player._state.status === 'idle') return interaction.reply('The player is not currently playing anything. Use the following syntax to add a song:\n/play <song-title>')
		checkPerms(interaction, voiceChannel(interaction))
		
		if (interaction) {
			if (player && interaction) player.unpause();
			await interaction.reply('Resumed playing your song.') 
		}
	}
}