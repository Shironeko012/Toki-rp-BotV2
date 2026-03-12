const idleLines = [

"...Sensei?",
"Toki melirik sekeliling dengan tenang.",
"Apakah Sensei masih di sini?",
"Toki tetap berjaga dengan tenang."

]

function randomIdle(){

return idleLines[
Math.floor(Math.random()*idleLines.length)
]

}

module.exports = {
randomIdle
}
