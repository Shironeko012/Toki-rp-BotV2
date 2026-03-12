/**
 * TOKI ROLEPLAY BOT
 * WhatsApp AI Roleplay System
 */

// FIX crypto for Baileys
const crypto = require("crypto")
if (!global.crypto) global.crypto = crypto.webcrypto

const express = require("express")

const {
default: makeWASocket,
useMultiFileAuthState,
DisconnectReason,
fetchLatestBaileysVersion
} = require("@whiskeysockets/baileys")

const qrcodeTerminal = require("qrcode-terminal")
const QRCode = require("qrcode")
const pino = require("pino")

const handler = require("./handler")

/*
OPTIONAL SYSTEMS
*/
const { antiCrash } = require("./utils/antiCrash")
const routine = require("./systems/routine")

const app = express()

/*
=====================
WEB SERVER
=====================
*/

app.get("/", (req,res)=>{
res.send("TOKI ROLEPLAY BOT ONLINE")
})

app.get("/qr",(req,res)=>{
res.sendFile(__dirname + "/qr.png")
})

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
console.log("Web server running on port", PORT)
})

/*
=====================
START BOT
=====================
*/

async function start(){

try{

console.log("Starting TOKI ROLEPLAY BOT...")

const { state, saveCreds } =
await useMultiFileAuthState("./session")

const { version } =
await fetchLatestBaileysVersion()

const sock = makeWASocket({

version,
auth: state,

logger: pino({ level:"silent" }),

browser:["TOKI","AI","ROLEPLAY"],

syncFullHistory:false,

printQRInTerminal:false,

markOnlineOnConnect:true

})

/*
=====================
SAVE SESSION
=====================
*/

sock.ev.on("creds.update", saveCreds)

/*
=====================
CONNECTION UPDATE
=====================
*/

sock.ev.on("connection.update", async(update)=>{

const { connection, lastDisconnect, qr } = update

/*
QR CODE
*/

if(qr){

console.log("QR RECEIVED")

// terminal QR
qrcodeTerminal.generate(qr,{small:false})

// save QR image
await QRCode.toFile("./qr.png", qr)

console.log("QR saved as qr.png")

if(process.env.RAILWAY_STATIC_URL){

console.log("Open QR here:")
console.log(process.env.RAILWAY_STATIC_URL + "/qr")

}

}

/*
CONNECTING
*/

if(connection === "connecting"){
console.log("Connecting to WhatsApp...")
}

/*
CONNECTED
*/

if(connection === "open"){
console.log("TOKI BOT CONNECTED")
}

/*
DISCONNECTED
*/

if(connection === "close"){

const reason = lastDisconnect?.error?.output?.statusCode

console.log("Connection closed:", reason)

if(reason !== DisconnectReason.loggedOut){

console.log("Reconnecting in 5 seconds...")
setTimeout(start,5000)

}

}

})

/*
=====================
MESSAGE HANDLER
=====================
*/

sock.ev.on("messages.upsert", async({ messages })=>{

try{

const msg = messages?.[0]

if(!msg) return

// ignore status broadcast
if(msg.key?.remoteJid === "status@broadcast") return

// ignore empty messages
if(!msg.message) return

await handler(sock,msg)

}catch(err){

console.error("Handler error:", err)

}

})

/*
=====================
SYSTEM ROUTINES
=====================
*/

if(routine){
routine(sock)
}

}catch(err){

console.error("START ERROR:", err)

setTimeout(start,5000)

}

}

/*
=====================
ANTI CRASH
=====================
*/

if(antiCrash){
antiCrash()
}

/*
=====================
RUN BOT
=====================
*/

start()
