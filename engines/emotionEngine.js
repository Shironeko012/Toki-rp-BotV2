const fs = require("fs/promises")
const path = require("path")

const DB_PATH = path.join(__dirname,"../database/emotion.json")

let cache = null

async function loadDB(){

if(cache) return cache

try{

const raw = await fs.readFile(DB_PATH,"utf8")
cache = JSON.parse(raw)

}catch{

cache = {}

}

return cache

}

async function saveDB(data){

cache = data
await fs.writeFile(DB_PATH,JSON.stringify(data,null,2))

}

function analyzeMessage(text){

text = text.toLowerCase()

if(text.includes("terima kasih")) return "tenang"

if(text.includes("tolong")) return "waspada"

if(text.includes("bahaya")) return "siaga"

if(text.includes("ganggu")) return "kesal"

return "tenang"

}

async function updateEmotion(user,message){

const db = await loadDB()

if(!db[user]) db[user] = { mood:"tenang" }

const mood = analyzeMessage(message)

db[user].mood = mood

await saveDB(db)

return mood

}

async function getEmotion(user){

const db = await loadDB()

if(!db[user]) db[user] = { mood:"tenang" }

return db[user].mood

}

module.exports = {
updateEmotion,
getEmotion
}
