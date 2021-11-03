import DiscordJS, { Intents } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

client.on('ready', ()=> {
    console.log("Cunt is online.");
})

client.on('messageCreate', async message => {
    if (message.content === 'ping') {
        await message.reply('Pong!');
    }
})

client.login(process.env.DISCORD_TOKEN)