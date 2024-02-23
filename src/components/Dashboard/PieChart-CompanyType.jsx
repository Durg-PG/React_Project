import React from 'react'
import ReactECharts from 'echarts-for-react';
import { useContext } from 'react';
import { CompanyContext } from '../Context/CompanyContext';

const PieChart_CompanyType = () => {
    const [company, setCompany] = useContext(CompanyContext);
    const B2BCompany = company.filter((item) => {
        return item.compType === "B2B";
        
      });
    const B2CCompany = company.filter((item) => {
        return item.compType === "B2C";
      });

    const option = {
        title: {
          text: 'Company Type',
          // subtext: 'Fake Data',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            stillShowZeroSum: false,
            radius: '50%',
            data: [
              { value: B2BCompany.length, name: 'B2B' },
              { value: B2CCompany.length, name: 'B2C' },
              
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
   
    // var activeCompany=[]
    // var inactiveCompany=[]

    
  return (
    <ReactECharts option={option} style={{ height: "80vh", left: 50, top: 50, width: "50%" }} />
  )
}

export default PieChart_CompanyType