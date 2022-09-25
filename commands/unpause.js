const { Permissions } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { players } = require('./play')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('resume')
		.setDescription('Resume playing.'),
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
		
		if (players[interaction.guildId].state.status === 'idle') return await interaction.reply('The player is not currently playing anything. Use the following syntax to add a song:\n/play <song-title>')
		
		if (interaction) {
			players[interaction.guildId].unpause();
			return await interaction.reply(':play_pause: Resumed') 
		}
	}
}