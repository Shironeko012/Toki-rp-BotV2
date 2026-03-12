const fs = require("fs/promises")
const path = require("path")

const DB_PATH = path.join(__dirname,"../database/scene.json")

let cache = null

const scenes = [
"ruang klub",
"koridor akademi",
"halaman sekolah",
"ruang keamanan",
"atap akademi"
]

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

function randomScene(){

return scenes[Math.floor(Math.random()*scenes.length)]

}

async function getScene(user){

const db = await loadDB()

if(!db[user])
db[user] = { location:randomScene() }

return db[user].location

}

async function nextScene(user){

const db = await loadDB()

db[user] = { location:randomScene() }

await saveDB(db)

return db[user].location

}

module.exports = {
getScene,
nextScene
}
