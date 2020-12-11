import React ,{useState,useEffect}from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import TextContainer from '../TextContainer/TextContainer'
import './Chat.css'
import Infobar from '../Infobar/Infobar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'
import FeedBack from 'react-feedback-popup';


let socket
export default function Chat({location}) {
    const [name,setName] = useState('')
    const [room,setRoom] = useState('')
    const [message,setMessage] = useState()
    const [messages,setMessages] = useState([])
    const [users,setUsers] = useState('')
    const ENDPOINT = 'https://facu-messageapp.herokuapp.com/'

    useEffect(()=>{
        const {name,room} = queryString.parse(location.search)
        

        socket = io(ENDPOINT)
        setRoom(room)
        setName(name)
        
        socket.emit('join',{name,room},()=>{
        
        })
        //unmount the Effect
        return ()=>{
            socket.emit('disconnect')
            socket.off()
        }
        
    },[ENDPOINT,location.search])

    useEffect(()=>{
        socket.on('message',(message)=>{
            //adds every new message to the messages array
            setMessages([...messages,message])
        })
        socket.on('roomData',({users})=>{setUsers(users)})
        return()=>{
            socket.off()
        }
    },[messages]) //run this only when the messages array changes

    //function for sending messages
    const sendMessage = (event)=>{
        event.preventDefault()

        if(message){
            socket.emit('sendMessage',message,()=>setMessage(''))
        }
    }
    console.log(message,messages)
    return (
        <div className='outerContainer'>
            <div className='container'>
                <Infobar room={room}/>
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <TextContainer users={users}>

            </TextContainer>
            <FeedBack
                style={{zIndex:'2', marginLeft:'20px', position:'fixed'}}
                position="right"
                numberOfStars={5}
                headerText="Have Feedback? 👇"
                bodyText="Need help? Have Feedback? Feel free to write it down and rate the app!"
                buttonText="Have Feedback? 👇"
                handleClose={() => console.log("handleclose")}
                handleSubmit={(data) => 
                    fetch('https://formspree.io/f/xdopwdvb', {
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        method: 'POST', // or 'PUT'
                        body: JSON.stringify(data),
                    }).then((response) => { 
                        if (!response.ok) {
                            return Promise.reject('Our servers are having issues! We couldn\'t send your feedback!');
                        }
                        response.json()
                    }).then(() => {
                        alert('Success!');
                    }).catch((error) => {
                        alert('Our servers are having issues! We couldn\'t send your feedback!', error);
                    })
                }
                handleButtonClick={() => console.log("handleButtonClick")}
            />
        </div>
    )
}
