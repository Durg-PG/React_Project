import React from 'react'
import '../Dashboard/dashboard.css'
import PieChart from './PieChart'
import { useContext } from 'react'
import { CompanyContext } from '../Context/CompanyContext'


const Dashboard = () => {
    const [company, setCompany] = useContext(CompanyContext);
    const B2BCompany = company.filter((item) => {
        return item.compType === "B2B";
        
      });
    const B2CCompany = company.filter((item) => {
        return item.compType === "B2C";
      });

    const inactiveCompany = company.filter((item) => {
        return item.stage === "Inactive";
      });
      const activeCompany = company.filter((item) => {
        return item.stage === "Active";
      });

    return(
        <>
        <h2 className='dashH1'>Dashboard</h2> 
        <div className='charts'>
            <PieChart text={'Company Type'} element1={{value1:B2BCompany.length, name1: 'B2B'}} element2={{value2:B2CCompany.length, name2:'B2C'}}></PieChart>
            <PieChart text={'Stage'} element1={{value1:activeCompany.length, name1: 'Active'}} element2={{value2:inactiveCompany.length, name2:'Inactive'}}></PieChart>
        {/* <PieChart_CompanyType></PieChart_CompanyType>
        <PieChart_Stage  ></PieChart_Stage> */}
        </div>
        </>
    )
}

export default Dashboard