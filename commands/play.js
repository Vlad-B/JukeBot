const { Permissions } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const play = require("play-dl");
const yTsearch = require("yt-search");
const {
    AudioPlayerStatus,
    createAudioPlayer,
    createAudioResource,
    joinVoiceChannel,
} = require("@discordjs/voice");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Plays from YouTube.")
        .addStringOption((option) =>
            option
                .setName("title")
                .setDescription("Song title.")
                .setRequired(true)
        ),

    player: createAudioPlayer(),

    voiceChannel: (interaction) => {
        const voiceChannel = interaction.member.voice.channel;
        return voiceChannel;
    },

    checkPerms: (interaction, channel) => {
        const reqPerms = [Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK];

        if (!interaction.member.permissions.has(reqPerms))
            return interaction.reply(
                "You don't have the required permissions."
            );
        if (!channel)
            return interaction.reply(
                "You need to be in a voice channel to execute this command!"
            );
    },

    async execute(interaction, args) {
        args = interaction.options.getString("title");
        this.checkPerms(interaction, this.voiceChannel(interaction));

        const connection = joinVoiceChannel({
            channelId: this.voiceChannel(interaction).id,
            guildId: this.voiceChannel(interaction).guildId,
            adapterCreator:
                this.voiceChannel(interaction).guild.voiceAdapterCreator,
            selfDeaf: false,
        });

        const videoFinder = async (query) => {
            const videoResults = await yTsearch(query);
            return videoResults.videos.length > 1
                ? videoResults.videos[0]
                : null;
        };
        const video = await videoFinder(args);

        if (video) {
            const stream = await play.stream(video.url);
            const resource = createAudioResource(stream.stream, {
                inputType: stream.type,
            });

            connection.subscribe(this.player);
            this.player.play(resource);

            await interaction.reply(
                `:call_me: Now playing *** ${video.title} ***`
            );
        } else {
            await interaction.reply("No video results found.");
        }

        this.player.on(AudioPlayerStatus.Idle, () =>
            setTimeout(() => connection.destroy(), 60000)
        );
    },
};
