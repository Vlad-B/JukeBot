const play = require('./commands/play.js')


module.exports.Pause = (interaction) => {
    if (play.player && interaction) play.player.pause();
}