import logo from '../guitarLogo.png'
import React, { useEffect, useState } from 'react'
import { songService } from '../services/song.service'
import { userService } from '../services/user.service'
import { useDispatch, useSelector } from 'react-redux'
import { loadUsers , login} from '../store/action/user.action'

function Home() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <h3 className="pt20">
         Enjoy Music Anywere .
        </h3>
      </header>
    </div>
  )
}

export default Home
