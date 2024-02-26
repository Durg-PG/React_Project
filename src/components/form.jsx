import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { CompanyContext, editContext } from "./Context/CompanyContext";
import { v4 as uuidv4 } from "uuid";
import Form from "react-bootstrap/Form";
import "../components/style.css";
import { Modal } from "react-bootstrap";

export default function EditCompany() {
  const [editid, setId] = useContext(editContext);
  const [name, setName] = useState(editid.name);
  const [location, setLocation] = useState(editid.location);
  const [compType, setCompType] = useState(editid.compType);
  const [industry, setIndustry] = useState(editid.industry);
  const [stage, setStage] = useState(editid.stage);

  const [company, setCompany] = useContext(CompanyContext);

  const handleSub = (e) => {
    const data = company.map((item) =>
      item.id === editid.id
        ? {
            id: editid.id,
            name: name,
            location: location,
            compType: compType,
            industry: industry,
            stage: stage,
          }
        : item
    );
    setCompany(data);
  };

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
            onSubmit={handleSub}
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
                onChange={(e) => setCompType(e.target.value)}
              />
              <Form.Check
                inline
                required
                type="radio"
                label="B2C"
                id="formHorizontalRadios2"
                className="radio-btn"
                value="B2C"
                checked={compType === "B2C"}
                onChange={(e) => setCompType(e.target.value)}
              />
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
              {btnText}
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}
