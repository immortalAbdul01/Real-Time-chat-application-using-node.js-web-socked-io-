

const chatForm = document.querySelector('#chat-form')
const join = document.querySelector('#join')
const ChatMessages = document.querySelector('.chat-messages')

const socket = io()
// join chat room


const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})
console.log(username, room);
socket.emit('joinRoom', { username, room })
socket.on('message', message => {
    console.log(message);
    outputMssg(message)
    ChatMessages.scrollTop = ChatMessages.scrollHeight

})

chatForm.addEventListener('submit', (e) => {
    e.preventDefault()
    // Get message text
    const mssg = e.target.elements.msg.value
    // emiting a message 

    socket.emit('ChatMessage', mssg)
    e.target.elements.msg.value = ''
    e.target.elements.msg.focus()
})




function outputMssg(mssg) {
    const div = document.createElement('div')
    div.classList.add('message')
    div.innerHTML = `  <p class="meta">${mssg.username}<span>${mssg.time}</span></p>
    <p class="text">
        ${mssg.text}
    </p>`

    document.querySelector('.chat-messages').appendChild(div)

}



