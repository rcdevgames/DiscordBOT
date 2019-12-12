var codigo = msg.content.replace("#correios","");
const trackingcorreios = require("tracking-correios")

const rastrear = async (code) => {
let codigoReal = code.replace(" ","")
const rastreio = await trackingcorreios.track(codigoReal).catch((x) => {
    msg.channel.send(`[CORREIOS] Codigo não postado!`)
});
rastreio[0].evento.map((x) => {
msg.channel.send(x.detalhe)
})
if(rastreio[0].evento.length == 0) {
    msg.channel.send(`[CORREIOS] Codigo não postado!`)
}
}
msg.channel.send(`[CORREIOS] Rastreando ${codigo}`)
rastrear(codigo)

