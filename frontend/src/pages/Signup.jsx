import React from 'react'
import './Signup.css'
import SignupBody from '../components/Signup/SignupBody'
import Navbar from '../components/Home/Navbar'

const Signup = () => {
  return (
    <div className='signupOuterDiv'>
      <Navbar/>
      <SignupBody/>
    </div>
  )
}

export default Signup
