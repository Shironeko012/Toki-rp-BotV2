function compress(prompt){

const MAX = 2000

if(prompt.length <= MAX)
return prompt

return prompt.slice(prompt.length - MAX)

}

module.exports = { compress }
