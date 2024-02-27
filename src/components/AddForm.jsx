import React from 'react'
import Form1 from './form'
import { v4 as uuidv4 } from "uuid";
import { CompanyContext } from "./Context/CompanyContext";
import { useContext } from 'react';

export default function AddForm() {
    const [company, setCompany] = useContext(CompanyContext);
    var companyNames = [];
    company.map((comp) => {
      companyNames.push(comp.name.toLowerCase());
    },[]);
    const onSubmit=(formData)=>{
        console.log('added',formData)
        const newCompany = [
            ...company,
            {
              id: uuidv4(),
              name: formData.name,
              location: formData.location,
              compType: formData.compType,
              industry: formData.industry,
              stage: formData.stage,
            },
          ];
    
          setCompany(newCompany);
    }

    return (
    <Form1
    initialValues={""}
    buttonText = 'Add'
    onSubmit={onSubmit}
    companyNames={companyNames}/>

    )
}