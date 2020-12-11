const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const {addUser,removeUser,getUser,getUsersInRoom} = require('./users')
const cors = require('cors')
const PORT = process.env.PORT || 5000

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const router = require('./router')
app.use(cors())

io.on('connection',(socket)=>{
    socket.on('join',({name,room},callback)=>{
        const {error,user} = addUser({id:socket.id,name,room})

        if(error) return callback(error)
        //this message is for the user that is entering
        socket.emit('message',{user:'admin',text:`${user.name} welcome to the room ${user.room}`})

        //broadcast is going to send a message to every user connected
        //this message is for everyone else, to know that a new user has joined
        socket.broadcast.to(user.room).emit('message',{user:'admin',text:`${user.name} has joined!`})

        //if there is no error, we join the user in the room
        socket.join(user.room)

        io.to(user.room).emit('roomData',{room:user.room,users:getUsersInRoom(user.room)})


        //this callback is to be able to do something else after the message is sent to the frontend
        callback()
        
        
    })
    //this is a callback that runs after the event is emitted
    socket.on('sendMessage',(message,callback)=>{
        const user = getUser(socket.id)

        io.to(user.room).emit('message',{user:user.name,text:message})
        io.to(user.room).emit('roomData',{room:user.room,users:getUsersInRoom(user.room)})

        callback()
    })

    socket.on('disconnect',()=>{
        const user = removeUser(socket.id)
        if(user){
            io.to(user.room).emit('message',{user:'admin',text:`${user.name} has left`})
        }
    })
})

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*')
    next()
})
app.use(router)
server.listen(PORT,()=> console.log(`Server has started on port ${PORT}`))
