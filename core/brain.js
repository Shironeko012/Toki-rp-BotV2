/**
 * CORE BRAIN CONTROLLER
 * Orchestrates engines and AI providers
 */

const contextEngine = require("./contextEngine")
const personality = require("./personalitySystem")
const promptComposer = require("./promptComposer")
const compressor = require("./contextCompressor")
const responseEngine = require("./responseEngine")
const probabilistic = require("./probabilisticEngine")

const memory = require("../engines/memoryEngine")

const askGemini = require("../ai/gemini")
const askOpenRouter = require("../ai/openrouter")

const antiInjection = require("../security/antiPromptInjection")

/* CONFIG */

const MAX_MESSAGE_LENGTH = 500
const AI_TIMEOUT = 15000

/* AI CALL WITH TIMEOUT */

async function callAIWithTimeout(fn, prompt){

return Promise.race([

fn(prompt),

new Promise((_,reject)=>
setTimeout(()=>reject(new Error("AI timeout")), AI_TIMEOUT)
)

])

}

/* MAIN BRAIN */

async function brain(user, message){

try{

/*
INPUT SANITIZATION
*/

let safeMessage = antiInjection.filter(message)

if(!safeMessage) safeMessage = "..."

safeMessage = safeMessage.slice(0, MAX_MESSAGE_LENGTH)

/*
BUILD CONTEXT
*/

let context = await contextEngine.build(user, safeMessage)

/*
PERSONALITY ENFORCEMENT
*/

context = personality.reinforce(context)

/*
INTENT DETECTION
*/

const intent = probabilistic.detectIntent(safeMessage)

context.intent = intent

/*
PROMPT COMPOSITION
*/

let prompt = promptComposer.compose(context)

/*
PROMPT COMPRESSION
*/

prompt = compressor.compress(prompt)

/*
========================
AI PRIMARY (GEMINI)
========================
*/

let aiResponse = null

try{

aiResponse = await callAIWithTimeout(askGemini, prompt)

}catch(err){

console.warn("Gemini failed, switching to OpenRouter")

}

/*
========================
AI FALLBACK (OPENROUTER)
========================
*/

if(!aiResponse){

try{

aiResponse = await callAIWithTimeout(askOpenRouter, prompt)

}catch(err){

console.warn("OpenRouter failed")

}

}

/*
FINAL FALLBACK
*/

if(!aiResponse || aiResponse.length < 2){

aiResponse = "...dipahami."

}

/*
POST PROCESS RESPONSE
*/

const finalResponse = responseEngine.process(user, aiResponse)

/*
MEMORY UPDATE
*/

await memory.pushMemory(user, `User: ${safeMessage}`)
await memory.pushMemory(user, `Toki: ${aiResponse}`)

/*
RETURN RESPONSE
*/

return finalResponse

}catch(err){

console.error("Brain Error:", err)

/*
FAILSAFE RESPONSE
*/

return `*Toki mengamati sekeliling dengan tenang.*

"...terjadi gangguan kecil pada sistem."`

}

}

module.exports = brain
