const parseMessage = require("./utils/parser")
const brain = require("./core/brain")

module.exports = async function handler(sock, msg){

try{

const m = parseMessage(msg)

if(!m) return

const { user, text } = m

// typing simulation
await sock.sendPresenceUpdate("composing", user)

const reply = await brain(user, text)

if(!reply) return

await sock.sendMessage(
user,
{ text: reply },
{ quoted: msg }
)

}catch(err){

console.error("Handler Error:", err)

}

}
