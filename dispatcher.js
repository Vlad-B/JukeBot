const play = require('./commands/play.js')


module.exports ={ 
    Pause: (interaction) => {
        if (play.player && interaction) play.player.pause();
    },
    Unpause: (interaction) => {
        if (play.player && interaction) play.player.unpause();
    },
    Stop: (interaction) => {
        if (play.player && interaction) play.player.stop();
    }
}
