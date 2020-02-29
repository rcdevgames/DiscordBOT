const Discord = require('discord.js')
const { Client } = require('whatsapp-web.js');

class BOT {
    constructor(token) {
        this.clientWp = new Client()
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
        this.clientWp.initialize();
        console.log('Bot is now connected!');
    }

}

module.exports = BOT;