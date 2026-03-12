/**
 * Anti-Repetition Engine
 * Menghindari respon yang sama berulang
 */

const history = new Map()

const MAX_HISTORY = 20

function normalize(text){

return text
.toLowerCase()
.replace(/[^\w\s]/g,"")
.trim()

}

function getHistory(user){

if(!history.has(user))
history.set(user,[])

return history.get(user)

}

function addHistory(user,text){

const h = getHistory(user)

h.push(normalize(text))

if(h.length > MAX_HISTORY)
h.shift()

}

function isRepeated(user,text){

const h = getHistory(user)

const normalized = normalize(text)

return h.includes(normalized)

}

function fallback(){

const fallbackLines = [

"...dipahami.",
"Situasi terkendali.",
"Tetap waspada.",
"Saya mengerti, Sensei."

]

return fallbackLines[
Math.floor(Math.random()*fallbackLines.length)
]

}

function filter(user,text){

if(!text) return fallback()

if(isRepeated(user,text)){

return fallback()

}

addHistory(user,text)

return text

}

module.exports = { filter }
