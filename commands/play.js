const { Permissions } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');
const ytdl = require('ytdl-core');
const yTsearch = require('yt-search')
const {
	AudioPlayerStatus,
	StreamType,
	createAudioPlayer,
	createAudioResource,
	joinVoiceChannel,
} = require('@discordjs/voice');

const dotenv = require('dotenv');
dotenv.config()


module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Plays from YouTube.')
		.addStringOption(option => option
			.setName('url')
			.setDescription('Play a song from YouTube')
			.setRequired(true)),

	async execute(interaction, args) {
		args = interaction.options.getString('url');
		const voiceChannel = interaction.member.voice.channel
		const reqPerms = [ Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK ];
		
		if(!interaction.member.permissions.has(reqPerms)) await interaction.reply("You don't have the required permissions.");
		if(!voiceChannel) return interaction.reply('You need to be in a voice channel to execute this command!');
  	}
}
   