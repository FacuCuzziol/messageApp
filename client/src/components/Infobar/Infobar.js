import React from 'react'
import './Infobar.css'
import closeIcon from '../../icons/closeIcon.png'
import onlineIcon from '../../icons/onlineIcon.png'
export default function Infobar({room}) {
    return (
        <div className='infoBar'>
            <div className='leftInnerContainer'>
                <img className='onlineIcon' src={onlineIcon} alt='online'/>
                <h3>{room}</h3>
            </div>
            <div className='rightInnerContainer'>
                <a href='/'><img src={closeIcon} alt='close'/></a>

            </div>
            
        </div>
    )
}
