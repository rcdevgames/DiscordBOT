import Bot from './src/bot'
import fs from 'fs';
import path, { resolve, extname } from 'path'

const BotInstance = new Bot("__TOKEN__");
console.log(process.env)
const CommandsPath = path.join(resolve(__dirname, 'src', 'commands'))

var count = 0;

fs.readdir(CommandsPath, (err, scripts) => {
    scripts.forEach((file) => {
        count+=1;
        fs.readFile(resolve(__dirname, 'src', 'commands', file), 'utf-8', (err, data) => {
            let nameFile = file.replace(extname(file), "");
            console.log(nameFile)
            var function_ = eval(`((msg) => {
                ${data}
            })`)
            BotInstance.addCommand(nameFile,function_)
        })
    })
})


BotInstance.client.on('message', async (msg) => {
    if (msg.content[0] == "#") {
        let cmd = msg.content.replace("#", "").split(" ")[0]
        console.log(cmd)
        if (cmd) {
            BotInstance.executeCommand(cmd, msg);
        }
    }
})