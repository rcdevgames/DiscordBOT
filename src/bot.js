const Discord = require('discord.js')

class BOT {
    constructor(token) {

        this.token = token;
        this.client = new Discord.Client()
        this.setup();
        this.commands = []
    }

    executeCommand(cmd, msg) {
        let verify = this.commands.find(x => x.Command == cmd);
        if (verify == undefined) {

        }
        console.log(verify)
        verify.Function(msg)
    }

    addCommand(cmd, cb) {
        if (cmd) {
            this.commands.push({
                Command: cmd,
                Function: cb
            })
        }
    }

    setup() {
        this.client.login(this.token);
        console.log('Bot is now connected!');
    }

}

module.exports = BOT;