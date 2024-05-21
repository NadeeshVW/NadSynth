import React from 'react';
import './SideBar.css';
import {assets} from '../../assets/assets'

const SideBar = () => {
  return (
    <div className='sidebar'>
        <div className="top">
        <img className='menu' src={assets.menu_icon} alt="" />
        <div className='new-chat'>
            <img src={assets.plus_icon} alt="" />
            <p>New Chat</p>
        </div>
        </div>
        <div className="bottom">

        </div>
      
    </div>
  )
}

export default SideBar
