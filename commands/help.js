const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
        .setDescription('Music commands'),
	async execute(interaction) {
		return interaction.reply('Use the following commands to access the music features:\n/play <song-tite>\n/pause\n/unpause\n/stop');
	},
};