import React from "react";
import Form1 from "./Form";
import { CompanyContext, editContext } from "./Context/CompanyContext";
import { useContext } from "react";
export default function EditForm() {
  const [editid, setId] = useContext(editContext);
  const [company, setCompany] = useContext(CompanyContext);
//   const [show, setShow] = useState(false);

//   const handleShow = () => setShow(true);
//   const handleClose = () => setShow(false);


  var companyNames = [];
  company.map((comp) => {
    if(comp.name.toLowerCase() !== editid.name.toLowerCase()){
    companyNames.push(comp.name.toLowerCase());
}},[]);


  const onSubmit = (formData) => {
    console.log("edited", formData);
    const editdata = company.map((item) =>
      item.id === editid.id
        ? {
            id: editid.id,
            name: formData.name,
            location: formData.location,
            compType: formData.compType,
            industry: formData.industry,
            stage: formData.stage,
          }
        : item
    );
    setCompany(editdata);
    // setId("");
  };

  return (
    <>
      <Form1 initialValues={editid} buttonText="Save" onSubmit={onSubmit} companyNames={companyNames}/>
   
    </>
  );
}