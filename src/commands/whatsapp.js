let func = msg.content.replace("#whatsapp", "").split(" ")[1]
let params = msg.content.replace("#whatsapp", "").split(" ")
console.log(params)
const { Client } = require('whatsapp-web.js');

const getNumero = async (name) => {
    let numero = "";
    const response = await BotInstance.clientWp.getContacts()
    response.map((contact) => {
        if (contact.pushname != undefined) {
            if (contact.pushname.toLowerCase().includes(name.toLowerCase())) {
                numero = contact.number;
            }
        } else {
            if (contact.name != undefined) {
                if (contact.name.toLowerCase().includes(name.toLowerCase())) {
                    numero = contact.number;
                }
            }
        }
    })
    msg.channel.send(numero);
}

const getContacts = async () => {
    const response = await BotInstance.clientWp.getContacts()
    response.map((contact) => {
        if (contact.pushname == undefined) {
            msg.channel.send(`${contact.name}`);
        } else {
            msg.channel.send(`${contact.pushname}`);
        }
    })
}

const MessageFetched = async(msg) => {
    const Contact = await BotInstance.clientWp.getContactById(msg.from)
    if(Contact.name != undefined){
        person.send(`[WHATSAPP] ${Contact.name}: ${msg.body}`)
    }else {
        person.send(`[WHATSAPP] ${Contact.pushname}: ${msg.body}`)
    }
}

switch (func) {
    case "disconnect":
        BotInstance.clientWp = new Client()
        BotInstance.clientWp.initialize()
        break;
    case "qr":
        BotInstance.clientWp.on('qr', (qr) => {
            msg.channel.send(`${qr}`)
            person = msg.channel;
        })
        BotInstance.clientWp.on('ready', () => {
            msg.channel.send("Conectado com Sucesso ao Whatsapp!")
        })
        BotInstance.clientWp.on('message', msg => {
            MessageFetched(msg)
            lastMsg = msg;
        });
        break;
    case "contatos":
        getContacts()
        break;
    case "contato":
        getNumero(params[2])
        break;
    case "responder":
        lastMsg.reply(msg.content.replace("#whatsapp responder", ""))
        break;
}