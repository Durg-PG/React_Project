import React from 'react'
import ReactECharts from 'echarts-for-react';
import { useContext } from 'react';
import { CompanyContext } from '../Context/CompanyContext';

const PieChart_Stage = () => {
    const [company, setCompany] = useContext(CompanyContext);
    const inactiveCompany = company.filter((item) => {
        return item.stage === "Inactive";
      });
      const activeCompany = company.filter((item) => {
        return item.stage === "Active";
      });

    const option = {
        title: {
          text: 'Stage',
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
              { value: activeCompany.length, name: 'Active ' },
              { value: inactiveCompany.length, name: 'Inactive' },
              
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

export default PieChart_Stage