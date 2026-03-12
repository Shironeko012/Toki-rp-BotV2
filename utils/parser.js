/**
 * Message Parser
 * Hanya memproses pesan private
 */

function extractText(msg){

if(!msg.message) return null

const m = msg.message

if(m.conversation) return m.conversation

if(m.extendedTextMessage)
return m.extendedTextMessage.text

if(m.imageMessage?.caption)
return m.imageMessage.caption

if(m.videoMessage?.caption)
return m.videoMessage.caption

return null

}

function parseMessage(msg){

try{

const jid = msg.key.remoteJid

// abaikan broadcast
if(jid === "status@broadcast")
return null

// cek group
const isGroup = jid.endsWith("@g.us")

// hanya private chat
if(isGroup)
return null

const text = extractText(msg)

if(!text) return null

return {

user: jid,
text: text.trim(),
isGroup: false,
id: msg.key.id,
timestamp: msg.messageTimestamp

}

}catch(err){

console.error("Parser error:", err)
return null

}

}

module.exports = parseMessage
