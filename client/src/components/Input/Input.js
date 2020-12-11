import React from 'react'
import {Form} from 'react-router-dom'
import './Input.css'

export default function Input({message,setMessage,sendMessage}) {
    return (
        <form className='form'>
            <input className='input' type='text' placeholder='Type a message...' value={message} onChange={(event)=> setMessage(event.target.value)}
            onKeyPress={event => event.key === 'Enter' ? sendMessage(event) :null}>
            </input>
            <button className='sendButton' onClick={(event)=>sendMessage(event)}>
            Send
            </button>
        </form>
    )
}
