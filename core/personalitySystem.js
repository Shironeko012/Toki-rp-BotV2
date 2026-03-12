const character = require("../characters/toki")

function reinforce(context){

return {

...context,

personality: character.personality,

rules: [
"tetap tenang",
"emosi minimal",
"panggil user Sensei",
"gaya bicara pendek",
"bertindak seperti bodyguard profesional"
]

}

}

module.exports = { reinforce }
