var eq = msg.content.replace("#soma","");
var stringMath = require('string-math');
const result = stringMath(eq)
msg.channel.send(`Resultado: ${result}`)