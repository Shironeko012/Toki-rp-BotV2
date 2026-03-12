const toki = require("../characters/toki")

function reinforce(context){

return {

...context,

character: toki.name,

personality: toki.personality,

rules: toki.behaviorRules,

speechStyle: toki.speechStyle

}

}

module.exports = { reinforce }
