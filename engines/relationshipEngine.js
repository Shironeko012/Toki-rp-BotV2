const fs = require("fs/promises")
const path = require("path")

const DB_PATH = path.join(__dirname,"../database/relationship.json")

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

function calculateLevel(score){

if(score < 5) return "stranger"
if(score < 20) return "neutral"
if(score < 50) return "trusted"
return "close"

}

async function updateRelationship(user,type){

const db = await loadDB()

if(!db[user]) db[user] = { score:0 }

if(type === "positive") db[user].score += 2
if(type === "negative") db[user].score -= 1

await saveDB(db)

return calculateLevel(db[user].score)

}

async function getRelationship(user){

const db = await loadDB()

if(!db[user]) db[user] = { score:0 }

return calculateLevel(db[user].score)

}

module.exports = {
updateRelationship,
getRelationship
}
