const contextEngine = require("./contextEngine")
const personality = require("./personalitySystem")
const promptComposer = require("./promptComposer")
const compressor = require("./contextCompressor")
const responseEngine = require("./responseEngine")
const probabilistic = require("./probabilisticEngine")

const memory = require("../engines/memoryEngine")

const askAI = require("../ai/gemini")

async function brain(user, message){

try{

// 1 build context
let context = await contextEngine.build(user, message)

// 2 reinforce personality
context = personality.reinforce(context)

// 3 detect intent
const intent = probabilistic.detectIntent(message)

// 4 compose prompt
let prompt = promptComposer.compose(context)

// 5 compress prompt
prompt = compressor.compress(prompt)

// 6 ask AI
let aiResponse = await askAI(prompt)

// fallback jika AI kosong
if(!aiResponse)
aiResponse = "...dipahami."

// 7 process response
const finalResponse = responseEngine.process(aiResponse)

// 8 save memory
await memory.pushMemory(user, `User: ${message}`)
await memory.pushMemory(user, `Toki: ${finalResponse}`)

return finalResponse

}catch(err){

console.error("Brain Error:", err)

return "*Toki mengamati sekeliling dengan tenang.*\n\n\"...terjadi kesalahan kecil.\""

}

}

module.exports = brain
