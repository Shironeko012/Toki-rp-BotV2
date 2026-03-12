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

output = antiRepeat.filter(output)

return output

}

function process(text){

const cleaned = clean(text)

return formatRoleplay(cleaned)

}

module.exports = { process }
