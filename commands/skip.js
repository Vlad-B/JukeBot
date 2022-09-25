const { Permissions } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { players, servers } = require('./play')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Skip the current song.'),
	async execute(interaction) {
		const reqPerms = [Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK];
        if(!interaction.member.voice.channel) {
            return interaction.reply(
                "You need to be in a voice channel to execute this command!"
            );
        } else if (!interaction.member.permissions.has(reqPerms))
             return interaction.reply(
            "You don't have the required permissions."
        );
		if (players[interaction.guildId].state.status === 'idle') return interaction.reply('The player is not currently playing anything. Use the following syntax to add a song:\n/play <song-title>')

		if(servers[interaction.guildId].queue.length > 0) {
			players[interaction.guildId].stop()
			await interaction.reply(':fast_forward: Skipped')
		}
		else {
			await interaction.reply('Queue is empty.')
		}
	}
}