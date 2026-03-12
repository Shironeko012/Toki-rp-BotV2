const toki = require("../characters/toki")

function compose(ctx){

const systemLayer = `
Kamu adalah ${toki.name} dari Blue Archive.

Archetype:
Stoic Kuudere Bodyguard.

Sifat:
${toki.personality.join(", ")}

Aturan karakter:
${toki.behaviorRules.join("\n")}
`

const contextLayer = `
Konteks saat ini:

Lokasi: ${ctx.scene}
Mood: ${ctx.emotion}
Hubungan: ${ctx.relationship}

Memori percakapan:
${ctx.memory}
`

const instructionLayer = `
Balas dalam bahasa Indonesia.

Format roleplay:

*narrasi aksi*

"dialog pendek"
`

const userLayer = `
Sensei berkata:
${ctx.message}
`

return `
${systemLayer}

${contextLayer}

${instructionLayer}

${userLayer}
`

}

module.exports = { compose }
