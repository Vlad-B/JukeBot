const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
        .setDescription('Music commands'),
	async execute(interaction) {
		return await interaction.reply(
		`Use the following commands to access the music features:
		/play <song-tite>  (Use this again to add to the queue)
		/pause
		/resume
		/stop`)
	},
};