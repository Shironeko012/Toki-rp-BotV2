function random(){

return Math.random()

}

function decideBehavior(){

const r = random()

if(r < 0.15) return "gesture"
if(r < 0.30) return "short"
if(r < 0.45) return "observe"
if(r < 0.60) return "analyze"

return "normal"

}

function detectIntent(text){

text = text.toLowerCase()

if(text.includes("halo") || text.includes("hai"))
return "greeting"

if(text.includes("terima kasih"))
return "acknowledge"

if(text.includes("tolong"))
return "protect"

if(text.includes("bye"))
return "farewell"

return "neutral"

}

module.exports = {
decideBehavior,
detectIntent
}
