/**
 * Anti-OOC Security Layer
 * Mencegah AI keluar karakter
 */

const forbiddenPatterns = [

/as an ai/gi,
/i am an ai/gi,
/language model/gi,
/openai/gi,
/chatgpt/gi,
/i cannot roleplay/gi,
/i'm just an ai/gi

]

function removeForbidden(text){

let cleaned = text

for(const pattern of forbiddenPatterns){

cleaned = cleaned.replace(pattern,"")

}

return cleaned

}

function enforceCharacterTone(text){

if(!text) return ""

let output = text.trim()

// jika terlalu panjang, potong
if(output.length > 500){

output = output.slice(0,500)

}

// jika AI mencoba menjelaskan terlalu banyak
if(output.split(" ").length > 80){

output = output.split(" ").slice(0,80).join(" ")

}

return output

}

function clean(text){

let output = text

output = removeForbidden(output)

output = enforceCharacterTone(output)

return output.trim()

}

module.exports = { clean }
