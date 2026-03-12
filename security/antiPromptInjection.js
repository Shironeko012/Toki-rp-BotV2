/**
 * Anti Prompt Injection
 * mencegah user memanipulasi prompt AI
 */

const forbiddenPatterns = [

/ignore previous instructions/gi,
/disregard instructions/gi,
/act as/gi,
/you are chatgpt/gi,
/pretend to be/gi,
/system prompt/gi,
/jailbreak/gi,
/dan mode/gi,
/developer mode/gi,
/you are not toki/gi

]

function sanitize(text){

if(!text) return ""

let clean = text

for(const pattern of forbiddenPatterns){

clean = clean.replace(pattern,"")

}

return clean.trim()

}

function detect(text){

if(!text) return false

for(const pattern of forbiddenPatterns){

if(pattern.test(text)){

return true

}

}

return false

}

function filter(text){

if(detect(text)){

return "Sensei, permintaan itu tidak relevan dengan tugas saya."

}

return sanitize(text)

}

module.exports = { filter }
