/**
 * OpenRouter AI Client
 * Used as fallback AI provider
 */

const fetch = require("node-fetch")

/*
CONFIG
*/

const API_URL = "https://openrouter.ai/api/v1/chat/completions"

const API_KEY = process.env.OPENROUTER_API_KEY

// model priority
const MODELS = [
"openai/gpt-4o-mini",
"mistralai/mistral-7b-instruct",
"meta-llama/llama-3.1-8b-instruct"
]

const MAX_TOKENS = 500
const TEMPERATURE = 0.7

/*
REQUEST FUNCTION
*/

async function requestModel(model, prompt){

const res = await fetch(API_URL, {

method: "POST",

headers: {
"Authorization": `Bearer ${API_KEY}`,
"Content-Type": "application/json",
"HTTP-Referer": "https://toki-roleplay-bot",
"X-Title": "Toki Roleplay Bot"
},

body: JSON.stringify({

model: model,

messages: [
{
role: "user",
content: prompt
}
],

max_tokens: MAX_TOKENS,
temperature: TEMPERATURE

})

})

if(!res.ok){

throw new Error(`OpenRouter error ${res.status}`)

}

const data = await res.json()

return data?.choices?.[0]?.message?.content

}

/*
MAIN FUNCTION
*/

async function askOpenRouter(prompt){

if(!API_KEY){

console.warn("OpenRouter API key missing")

return null

}

for(const model of MODELS){

try{

const response = await requestModel(model, prompt)

if(response && response.length > 2){

return response.trim()

}

}catch(err){

console.warn(`Model ${model} failed`)

}

}

return null

}

module.exports = askOpenRouter
