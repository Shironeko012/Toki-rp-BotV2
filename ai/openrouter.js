const axios = require("axios")

const API_KEY = process.env.OPENROUTER_API_KEY || "ISI_API_KEY_KAMU"

const MODEL = "deepseek/deepseek-chat"

async function askAI(prompt){

try{

const res = await axios.post(

"https://openrouter.ai/api/v1/chat/completions",

{
model: MODEL,

messages: [
{
role: "system",
content: "You are Asuma Toki from Blue Archive. Speak Indonesian."
},
{
role: "user",
content: prompt
}
],

temperature: 0.7

},

{
headers: {

Authorization: `Bearer ${API_KEY}`,

"Content-Type": "application/json",

"HTTP-Referer": "https://github.com",

"X-Title": "toki-roleplay-bot"

}

}

)

return res.data.choices?.[0]?.message?.content || null

}catch(err){

console.error("OpenRouter Error:", err.response?.data || err.message)

return null

}

}

module.exports = askAI
