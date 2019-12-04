let cmds = msg.content.replace("#", "").split(" ");
var memory = "";

for (let i in cmds) {
    if (i > 1) {
        memory = memory + " " + cmds[i];
    }
}
var function_ = eval(`((msg) => {
    ${memory}
})`)
msg.channel.send(`Comando # ${cmds[1]} adicionado com sucesso!`)
BotInstance.addCommand(cmds[1], function_);