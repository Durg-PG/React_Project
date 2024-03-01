import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { CompanyContext, editContext } from "./Context/CompanyContext";
import { v4 as uuidv4 } from "uuid";
import Form from "react-bootstrap/Form";
import "../components/style.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";


export default function Form1({
  onSubmit,
  initialValues,
  buttonText,
  companyNames,
}) {
  const [editid, setId] = useContext(editContext);
  const [name, setName] = useState(initialValues.name);
  const [location, setLocation] = useState(initialValues.location);
  const [compType, setCompType] = useState(initialValues.compType);
  const [industry, setIndustry] = useState(initialValues.industry);
  const [stage, setStage] = useState(initialValues.stage || "Active");
  const [selected, setSelected] = useState("");
  const [company, setCompany] = useContext(CompanyContext);
  console.log("names", companyNames);
  const [show, setShow] = useState(false);

  const handleShow = () => {setShow(true);
    toast.error("Company Already Exists !!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const handleClose = () => setShow(false);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() == true) {
      if (companyNames.includes(name.toLowerCase())) {
        handleShow();
      } else {
        onSubmit({
          id: editid.id || uuidv4,
          name: name,
          location: location,
          compType: compType,
          industry: industry,
          stage: stage,
          selected:selected,
        });
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
        <div className="form-innerdiv">
          <Form
            className="compForm"
            autoComplete="off"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <Form.Group>
              <Form.Label htmlFor="name" className="col-sm-2 col-form-label">
                Company Name
              </Form.Label>
              <input
                type="text"
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
                id="formHorizontalRadios1"
                className="radio-btn"
                checked={compType === "B2B"}
                                name="formHorizontalRadios"
                onChange={(e) => setCompType(e.target.value)}
              />
              <Form.Check
                inline
                required
                type="radio"
                label="B2C"
                id="formHorizontalRadios2"
                                name="formHorizontalRadios"
                className="radio-btn"
                value="B2C"
                checked={compType === "B2C"}
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
              </Form.Label>
              <select
                value={stage}
                className="form-select"
                onChange={(e) => setStage(e.target.value)}
              >
                <option value="Active">Active</option>

                <option value="Inactive">Inactive</option>
              </select>
            </Form.Group>

            <button className="btn btn-primary" type="submit">
              {buttonText}
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}
