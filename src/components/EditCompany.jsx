import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { CompanyContext, editContext } from "./Context/CompanyContext";
import { v4 as uuidv4 } from "uuid";
import Form from "react-bootstrap/Form";
import "../components/style.css"
import { Modal } from "react-bootstrap";

export default function EditCompany() {
   const[editid,setId] =  useContext(editContext)
  const [name, setName] = useState(editid.name);
  const [location, setLocation] = useState(editid.location);
  const [compType, setCompType] = useState(editid.compType);
  const [industry, setIndustry] = useState(editid.industry);
  const [stage, setStage] = useState(editid.stage);

  const [company, setCompany] = useContext(CompanyContext);

  const [validated, setValidated] = useState(false);


  const [show, setShow] = useState(false);
//   console.log('in edit');

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  
  

  var companyNames = [];
  company.map((comp) => {
    if(comp.name.toLowerCase() !== editid.name.toLowerCase()){
    companyNames.push(comp.name.toLowerCase());
}},[]);

  const editCompany = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() == true) {
      if (companyNames.includes(name.toLowerCase())) {
        // alert('company is already existing')
        // navigate("/dashboard");
        handleShow()

      } else {
        const editdata = company.map((item)=>
        item.id === editid.id ?  
          {
            name: name,
            location: location,
            compType: compType,
            industry: industry,
            stage: stage,
          }
          : item)
        
  
        setCompany(editdata);

      // navigate("/dashboard");
    }
   } else {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
  };

  useEffect(() => {
    localStorage.setItem("company", JSON.stringify(company));
  }, [company]);

  return (
    <>
      <div className="newcomp-form">
        {/* <h2>New Company</h2> */}
        <div className="form-innerdiv">
          
          <Form
            className="compForm"
            autoComplete="off"
            noValidate
            validated={validated}
            onSubmit={editCompany}
          >

            <Form.Group>
              <Form.Label htmlFor="name" className="col-sm-2 col-form-label">
                Company Name
              </Form.Label>
              <input
                type="text"
                // id="name"
                className="form-control"
                placeholder="eg. Raytheon technologies"
                onChange={(e) => setName(e.target.value)}
                id="name"
                value={name}
                required
              />

              <Form.Control.Feedback type="invalid">
                Please enter company name.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="loc" className="col-sm-2 col-form-label">
                Location
              </Form.Label>
              <input
                type="text"
                id="loc"
                className="form-control"
                placeholder="eg. Boston"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter location.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label className="col-sm-2 col-form-label">
                Company Type
              </Form.Label>
              <Form.Check
                inline
                type="radio"
                label="B2B"
                required
                value="B2B"
                // name="formHorizontalRadios"
                id="formHorizontalRadios1"
                className="radio-btn"
                checked={compType === 'B2B'}
                onChange={(e) => setCompType(e.target.value)}
              />
              <Form.Check
                inline
                required
                type="radio"
                label="B2C"
                // name="formHorizontalRadios"
                id="formHorizontalRadios2"
                className="radio-btn"
                value="B2C"
                checked={compType === 'B2C'}
                onChange={(e) => setCompType(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please select Company type.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label
                htmlFor="industry"
                className="col-sm-2 col-form-label"
              >
                Industry
              </Form.Label>
              <input
                type="text"
                id="industry"
                className="form-control"
                placeholder="eg. software"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter industry.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label className="col-sm-2 col-form-label">
                Select Stage
                <select
                  // placeholder='select stage'
                  value={stage}
                  className="form-select"
                  onChange={(e) => setStage(e.target.value)}
                >
                  <option value="Active">Active</option>

                  <option value="Inactive">Inactive</option>
                </select>
              </Form.Label>
            </Form.Group>

            <button className="btn btn-primary" type="submit">
              save
            </button>
          </Form>
        </div>
      </div>

      <Modal show={show}>
    <Modal.Body>
        <p>company with this name already exits</p>
        <button onClick={handleClose}>ok</button>
    </Modal.Body>
   
</Modal>
    </>
  );
}