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
const guildId = process.env.GUILD_ID;

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

		const connection = joinVoiceChannel({
			channelId: voiceChannel.id,
			guildId: guildId,
			adapterCreator: voiceChannel.guild.voiceAdapterCreator,
			selfDeaf: false
		});

		const videoFinder = async (query) => {
			const videoResults = await yTsearch(query)
			return (videoResults.videos.length > 1) ? videoResults.videos[0] : null
		}
		const video = await videoFinder(args)
		const player = createAudioPlayer();
		
		if(video) {
			const stream = ytdl(video.url, { filter: 'audioonly' });
			const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
		
			player.play(resource);
			connection.subscribe(player);
			
			await interaction.reply(`:call_me: Now playing *** ${video.title} ***`)
		} else {
			await interaction.reply('No video results found.')
		}
		player.on(AudioPlayerStatus.Idle, () => connection.destroy());
  	}
}
   