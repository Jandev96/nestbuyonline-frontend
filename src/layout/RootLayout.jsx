import React from 'react'
import Header from '../components/user/Header'
import Footer from '../components/user/Footer'
import { Outlet } from 'react-router-dom'
import UserHeader from '../components/user/UserHeader'
import { useState } from 'react'

function RootLayout() {
  const [isUserAuth, setIsAuth]=useState(false)
  return (
    <>
    {isUserAuth ? <UserHeader/> :  <Header/> }
    <div className='min-h-100'>
     <Outlet/>

    </div>

    <Footer/>
    </>
  )
}

export default RootLayout