const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("repo")
        .setDescription("Link to my GitHub repository."),
    async execute(interaction) {
        return interaction.reply(`https://github.com/Vlad-B/discord-music-bot`);
    },
};
