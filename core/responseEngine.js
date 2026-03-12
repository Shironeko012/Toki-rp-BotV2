const antiOOC = require("../security/antiOOC")
const antiRepeat = require("../security/antiRepetition")
const gesture = require("../engines/gestureEngine")

function formatRoleplay(text){

const action = gesture.randomGesture()

return `*${action}*\n\n"${text.trim()}"`

}

function clean(text){

let output = text

output = antiOOC.clean(output)

return output

}

function process(user, text){

let output = clean(text)

output = antiRepeat.filter(user, output)

return formatRoleplay(output)

}

module.exports = { process }
