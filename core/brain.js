const contextEngine = require("./contextEngine")
const personality = require("./personalitySystem")
const promptComposer = require("./promptComposer")
const compressor = require("./contextCompressor")
const responseEngine = require("./responseEngine")
const probabilistic = require("./probabilisticEngine")

const memory = require("../engines/memoryEngine")

const askAI = require("../ai/gemini")

const antiInjection = require("../security/antiPromptInjection")

async function brain(user, message){

try{

// sanitize user input
const safeMessage = antiInjection.filter(message)

// build context
let context = await contextEngine.build(user, safeMessage)

// enforce personality
context = personality.reinforce(context)

// detect intent
const intent = probabilistic.detectIntent(safeMessage)

// compose prompt
let prompt = promptComposer.compose(context)

// compress prompt
prompt = compressor.compress(prompt)

// ask AI
let aiResponse = await askAI(prompt)

if(!aiResponse)
aiResponse = "...dipahami."

// process response
const finalResponse = responseEngine.process(user, aiResponse)

// save memory
await memory.pushMemory(user, `User: ${safeMessage}`)
await memory.pushMemory(user, `Toki: ${finalResponse}`)

return finalResponse

}catch(err){

console.error("Brain Error:", err)

return "*Toki mengamati sekeliling dengan tenang.*\n\n\"...terjadi gangguan kecil.\""

}

}

module.exports = brain
