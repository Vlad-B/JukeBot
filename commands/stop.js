const { Permissions } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { players, servers } = require('./play')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Stops playing the song'),
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

		if (interaction) {
			servers[interaction.guildId].queue = [];
			players[interaction.guildId].stop();
			return await interaction.reply(':stop_button: Stopped') 
		}
	}
}