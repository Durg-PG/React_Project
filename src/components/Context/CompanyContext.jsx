import { createContext, useState } from "react";


export const CompanyContext = createContext();

export const CompanyProvider = (props)=>{
    

    //localStorage.setItem('company',JSON.stringify(defaultCompanyList));
    const getCompany = JSON.parse(localStorage.getItem('company'));

     const [company, setCompany]= useState(getCompany? getCompany:[])//global state
     console.log(company);
    return(
        <CompanyContext.Provider value={[company, setCompany]}>
            {props.children}
        </CompanyContext.Provider>
    );
}