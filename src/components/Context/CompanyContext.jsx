import { createContext, useState } from "react";


export const CompanyContext = createContext();
export const editContext = createContext();

export const CompanyProvider = (props)=>{
    const [editid,setId] = useState('')

    //localStorage.setItem('company',JSON.stringify(defaultCompanyList));
    const getCompany = JSON.parse(localStorage.getItem('company'));

     const [company, setCompany]= useState(getCompany? getCompany:[])//global state
    //  console.log(company);
    return(
        <CompanyContext.Provider value={[company, setCompany]}>
            <editContext.Provider value={[editid,setId]}>

            {props.children}
            </editContext.Provider>
        </CompanyContext.Provider>
    );
}

