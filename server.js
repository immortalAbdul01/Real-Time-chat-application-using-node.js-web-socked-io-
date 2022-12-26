const express = require('express')
const path = require('path')
const http = require('http')
const formatmssg = require('./Public/utils/mssg')
const { userJoin, getCurrentUser, userLeave, userRoom } = require('./Public/utils/users')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)


const bot = 'BOT'
// set static folder to display html files
app.use(express.static(path.join(__dirname, 'Public')))
io.on('connection', socket => {
    socket.on('joinRoom', ({ username, room }) => {
        const user = userJoin(socket.id, username, room)

        socket.join(room)
        socket.emit('message', formatmssg(bot + " ", 'Welcome to the chat'))
        // Broadcaster when user join the cht 
        socket.broadcast.to(room).emit('message', formatmssg(bot + " ", `${username} has joined the chat`))
    })




    socket.on('ChatMessage', (mssg) => {
        const user = getCurrentUser(socket.id)
        io.to(user.room).emit('message', formatmssg(user.username + " ", mssg))
    })

    // when user disconnects
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);
        if (user) {

            io.to(user.room).emit('message', `${user.username} has left the cha`)
        }
    })
})
const PORT = 3000 || process.env.PORT
server.listen(PORT, () => {
    console.log('server started at port ', PORT);
})