const fs = require("fs/promises")
const path = require("path")

const DB_PATH = path.join(__dirname, "../database/memory.json")

let cache = null

async function loadDB(){

if(cache) return cache

try{

const raw = await fs.readFile(DB_PATH, "utf8")
cache = JSON.parse(raw)

}catch{

cache = {}

}

return cache

}

async function saveDB(data){

cache = data
await fs.writeFile(DB_PATH, JSON.stringify(data,null,2))

}

async function getMemory(user){

const db = await loadDB()

if(!db[user]) db[user] = []

return db[user]

}

async function pushMemory(user, entry){

const db = await loadDB()

if(!db[user]) db[user] = []

db[user].push(entry)

if(db[user].length > 30)
db[user] = db[user].slice(-30)

await saveDB(db)

}

async function summarize(user){

const memory = await getMemory(user)

return memory.slice(-10).join("\n")

}

module.exports = {
getMemory,
pushMemory,
summarize
}
