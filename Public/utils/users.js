const users = [];

// join user chat 
function userJoin(id, username, room) {
    const user = { id, username, room }
    users.push(user)
}

function getCurrentUser(id) {
    return users.find(user => user.id === id)
}

// when user leave the chat
function userLeave(id) {
    const index = users.findIndex(user => user.id === id)
    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

// users in a room 
function userRoom(room) {
    return users.filter(user => user.room === room)
}
module.exports = {
    userJoin,
    getCurrentUser,
    userLeave, userRoom
}

