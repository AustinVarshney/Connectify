import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import './DashboardBody.css'

const DashboardBody = () => {
  const [loggedUser, setLoggedUser] = useState('User');

  useEffect(() => {
    setLoggedUser(localStorage.getItem('LoggedInUser'));
  })
  return (
    <div className='outerDashboardBody1'>
        <div className='innerDashboardBody1'>
            <p>Welcome {loggedUser}, Please Enter Meeting ID to Join.</p>
            <div>
                <input type="text" placeholder='Enter Meeting Code' />
                <Link><button>Meet</button></Link>
            </div>
        </div>
    </div>
  )
}

export default DashboardBody
