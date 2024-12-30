import React from 'react'
import './Dashboard.css'
import DashboardBody from '../components/Dashboard/DashboardBody'
import DashNav from '../components/Dashboard/DashNav'

const Dashboard = () => {
    return (
        <div className='dashboardOuterDiv'>
            <DashNav/>
            <DashboardBody/>
        </div>
    )
}

export default Dashboard
