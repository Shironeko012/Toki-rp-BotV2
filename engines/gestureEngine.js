const gestures = [

"Toki mengamati sekeliling dengan ekspresi datar",
"Toki menyilangkan tangan dengan tenang",
"Toki menatap area sekitar dengan waspada",
"Toki berdiri di samping Sensei",
"Toki sedikit menghela napas"

]

function randomGesture(){

return gestures[
Math.floor(Math.random()*gestures.length)
]

}

module.exports = {
randomGesture
}
