import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { CompanyContext } from "./Context/CompanyContext";
import { v4 as uuidv4 } from "uuid";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import "../components/style.css"

import { Modal} from 'react-bootstrap';

export default function AddCompany() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [compType, setCompType] = useState("");
  const [industry, setIndustry] = useState("");
  const [stage, setStage] = useState("Active");

  const [company, setCompany] = useContext(CompanyContext);
  // console.log(company);
// console.log('in add');
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  var companyNames = [];
  company.map((comp) => {
    companyNames.push(comp.name.toLowerCase());
  },[]);
  const addCompany = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    // console.log(form.checkValidity());
    // console.log({ validated });

    if (form.checkValidity() == true) {
      if (companyNames.includes(name.toLowerCase())) {
        // alert('company is already existing')
handleShow()
        // navigate("/dashboard");

      } else {
      const newCompany = [
        ...company,
        {
          id: uuidv4(),
          name: name,
          location: location,
          compType: compType,
          industry: industry,
          stage: stage,
        },
      ];

      setCompany(newCompany);
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
        <h2>New Company</h2>
        <div className="form-innerdiv">
          
          <Form
            className="compForm"
            autoComplete="off"
            noValidate
            validated={validated}
            onSubmit={addCompany}
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
                // value={name}
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
              Add
            </button>
          </Form>
        </div>
      </div>

      <Modal show={show}>
    <Modal.Body>
        <p>company already exits</p>
        <button onClick={handleClose}>ok</button>
    </Modal.Body>
   
</Modal>
    </>
  );
}