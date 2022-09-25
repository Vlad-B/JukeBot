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
    players: {},
    connections: {},
    servers: {},
    async playResource(interaction, video, msg) {
        const guildId = interaction.guildId;
        const server = this.servers[guildId];
        const player = this.players[guildId];
        const connection = this.connections[guildId]
        const stream = await play.stream(video.url);
        const resource = createAudioResource(stream.stream, {
            inputType: stream.type,
        });

        player.play(resource);
        if (msg === "play") {
            await interaction.editReply(
                `:arrow_forward: Now playing *** ${video.title} ***`
            );
        } else if (msg === "queue") {
            await interaction.channel.send(
                `:arrow_forward: Now playing *** ${video.title} *** from queue.`
            );
        }

        server.queue.shift();
        player.on(AudioPlayerStatus.Idle, async () => {
            if (server.queue[0]) {
                this.playResource(interaction, server.queue[0], "queue");
            } 
            // else {
            //     setTimeout(() => connection.disconnect(), 60000);
            // }
        });
    },
    async execute(interaction, args) {
        interaction.deferReply();
        const reqPerms = [Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK];
        if (!interaction.member.voice.channel) {
            return interaction.editReply(
                "You need to be in a voice channel to execute this command!"
            );
        } else if (!interaction.member.permissions.has(reqPerms))
            return interaction.editReply(
                "You don't have the required permissions."
            );

        args = interaction.options.getString("title");
        const guildId = interaction.guildId;

        if(!this.players[guildId]) {
            this.players[guildId] = createAudioPlayer();
        }
        if (!this.servers[guildId])
        this.servers[guildId] = {
            queue: [],
        };
        if (!this.connections.hasOwnProperty(guildId)) {
            this.connections[guildId] = joinVoiceChannel({
                channelId: interaction.member.voice.channel.id,
                guildId,
                adapterCreator:
                    interaction.member.voice.channel.guild.voiceAdapterCreator,
                selfDeaf: false,
            });
            this.connections[guildId].subscribe(this.players[guildId]);
        } else {
            this.connections[guildId].subscribe(this.players[guildId]);
        }

        const videoFinder = async (query) => {
            const videoResults = await yTsearch(query);
            return videoResults.videos.length > 1
                ? videoResults.videos[0]
                : null;
        };
        const video = await videoFinder(args);

        if (video) {
            const server = this.servers[guildId]
            const player = this.players[guildId]
            server.queue.push(video);
            if (player.state.status === "idle") {
                this.playResource(interaction, server.queue[0], "play");
            } else if (player.state.status === "playing") {
                await interaction.editReply(
                    `:white_check_mark: Added: *** ${video.title} ***`
                );
            }
        } else {
            await interaction.editReply("No video results found.");
        }
    },
};
