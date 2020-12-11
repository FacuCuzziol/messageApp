import React from 'react'
import './TextContainer.css'
import onlineIcon from '../../icons/onlineIcon.png'

export default function TextContainer({users}) {
    console.log(`USSSSSSSSSSSSEERS ${users}`)
    return (
        <div className='textContainer'>
            <div>
                <h1>Realtime Chat App <span role='img' area-label='emoji'>💬</span></h1>
                
                <h2>Made with React,Express,Node and Socket.io <span role='img' aria-label='emoji'>😄</span></h2>
            </div>
            {
            users
                ? (
                <div>
                    <h1>People Online:</h1>
                    <div className="activeContainer">
                    <h2>
                        {users.map(({name}) => (
                        <div key={name} className="activeItem">
                            {name}
                            <img alt="Online Icon" src={onlineIcon}/>
                        </div>
                        ))}
                    </h2>
                    </div>
                </div>
                )
                : null
            }
        </div>
    )
}
