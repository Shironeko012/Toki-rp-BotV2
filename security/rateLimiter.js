/**
 * Rate Limiter
 * mencegah spam message
 */

const users = new Map()

const LIMIT = 5
const WINDOW = 10000

function check(user){

const now = Date.now()

if(!users.has(user)){

users.set(user,[])

}

const timestamps = users.get(user)

// hapus timestamp lama
const filtered = timestamps.filter(
t => now - t < WINDOW
)

filtered.push(now)

users.set(user,filtered)

if(filtered.length > LIMIT){

return false

}

return true

}

module.exports = { check }
