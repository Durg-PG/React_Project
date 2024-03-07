import React from "react";
import { Form1 } from "./Form";
import { v4 as uuidv4 } from "uuid";
import { CompanyContext } from "../../context/CompanyContext";
import { useContext } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export default function AddForm() {
  const [company, setCompany] = useContext(CompanyContext);
  var companyNames = [];

  company.map((comp) => {
    companyNames.push(comp.name.toLowerCase());
  }, []);
  const onSubmit = (formData) => {
    const newCompany = [
      ...company,
      {
        id: uuidv4(),
        name: formData.name,
        location: formData.location,
        compType: formData.compType,
        industry: formData.industry,
        stage: formData.stage,
        selected: formData.selected,
      },
    ];
    setCompany(newCompany);
    toast.success("Company Added Successfully !", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  return (
    <>
      <Form1
        initialValues={""}
        buttonText="Add"
        onSubmit={onSubmit}
        companyNames={companyNames}
      />

    </>
  );
}
