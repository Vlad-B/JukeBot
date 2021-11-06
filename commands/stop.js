const { Permissions } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');

const dotenv = require('dotenv');
dotenv.config()
const guildId = process.env.GUILD_ID;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Stops playing from YouTube.'),
	async execute(interaction) {
		const voiceChannel = interaction.member.voice.channel
		const reqPerms = [ Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK ];
		
		if(!interaction.member.permissions.has(reqPerms)) await interaction.reply("You don't have the required permissions.");
		if(!voiceChannel) await interaction.reply('You need to be in a voice channel to execute this command!');

		console.log(voiceChannel.members)
	}
}