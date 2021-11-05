const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Stops playing from YouTube.'),
	async execute(interaction) {
		return interaction.reply('Stopepd playing (song).');
	},
};