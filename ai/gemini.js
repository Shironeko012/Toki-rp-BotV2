/**
 * Gemini AI Connector
 * Production-ready AI caller with timeout protection
 */

require("dotenv").config()

const { GoogleGenerativeAI } = require("@google/generative-ai")

const antiOOC = require("../security/antiOOC")

const API_KEY = process.env.GEMINI_API_KEY

if(!API_KEY){
throw new Error("GEMINI_API_KEY not found in environment variables")
}

const genAI = new GoogleGenerativeAI(API_KEY)

const model = genAI.getGenerativeModel({
model: "gemini-1.5-flash"
})

/*
CONFIG
*/

const AI_TIMEOUT = 15000
const MAX_RETRY = 2

/*
TIMEOUT PROMISE
*/

function timeout(ms){

return new Promise((_,reject)=>
setTimeout(()=>reject(new Error("AI Timeout")),ms)
)

}

/*
SANITIZE RESPONSE
*/

function sanitize(text){

if(!text) return ""

let output = text.trim()

// remove markdown blocks
output = output.replace(/```/g,"")

// remove excessive new lines
output = output.replace(/\n{3,}/g,"\n\n")

return output

}

/*
CALL GEMINI
*/

async function callGemini(prompt){

const result = await model.generateContent(prompt)

const response = await result.response

return response.text()

}

/*
MAIN AI FUNCTION
*/

async function askAI(prompt){

for(let attempt = 0; attempt <= MAX_RETRY; attempt++){

try{

const aiResult = await Promise.race([
callGemini(prompt),
timeout(AI_TIMEOUT)
])

let output = sanitize(aiResult)

// apply anti-OOC filter
output = antiOOC.clean(output)

return output

}catch(err){

console.error(`Gemini attempt ${attempt+1} failed:` , err.message)

if(attempt === MAX_RETRY){

return "...dipahami."

}

}

}

}

module.exports = askAI
