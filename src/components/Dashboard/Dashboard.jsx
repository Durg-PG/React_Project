import React from 'react'
import PieChart_CompanyType from './PieChart-CompanyType'
import PieChart_Stage from './PieChart-Stage'
import '../Dashboard/dashboard.css'


const Dashboard = () => {

    return(
        <>
        <h2 className='dashH1'>Dashboard</h2> 
        <div className='charts'>
        <PieChart_CompanyType></PieChart_CompanyType>
        <PieChart_Stage></PieChart_Stage>
        </div>
        </>
    )
}

export default Dashboard