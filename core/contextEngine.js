const memory = require("../engines/memoryEngine")
const emotion = require("../engines/emotionEngine")
const relationship = require("../engines/relationshipEngine")
const scene = require("../engines/sceneEngine")

async function build(user, message){

const memorySummary = await memory.summarize(user)

const mood = await emotion.updateEmotion(user, message)

const relation = await relationship.getRelationship(user)

const location = await scene.getScene(user)

return {

user,
message,

memory: memorySummary,
emotion: mood,
relationship: relation,
scene: location,

timestamp: Date.now()

}

}

module.exports = { build }
