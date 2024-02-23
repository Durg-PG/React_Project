import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Filter } from "../../Data/Data";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/esm/Col";
import InputGroup from "react-bootstrap/InputGroup";
import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { CompanyContext } from "../Context/CompanyContext";
import { useContext } from "react";
import { useEffect } from "react";
// import '../../style.css'
import "../style.css"
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const makeStyle = (stage) => {
  if (stage === "Active") {
    return {
      background: "green",
      
    };
  } else {
    return {
      background: "red",
      padding: "10px 15px",
    };
  }
};

export default function BasicTable() {
  const [search, setSearch] = useState("");
  const [company, setCompany] = useContext(CompanyContext);
  const [filteredComp, setFilteredComp] = useState("");
  const [flag, setFlag] = useState("false");

  console.log(company);

  const deleteCompany = (e) => {
    e.preventDefault();

    const filterCompany = company.filter((item) => {
      return item.id !== e.target.id;
    });
    setCompany(filterCompany);
  };


  useEffect(() => {
    localStorage.setItem("company", JSON.stringify(company));
  }, [company]);

  return (
    <div className="Table">
      <div className="headerRow">
        <h2 style={{color:"#253053"}}>Companies</h2>

        <div className="input-searchform">
          <Form.Group as={Col}>
            <InputGroup>
              <InputGroup.Text
              // onClick={() => {
              //   console.log(search);
              // }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
              </InputGroup.Text>
              <Form.Control
                type="text"
                className="form-control "
                placeholder="Search Company"
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
        </div>
        <div className="Filter-add d-flex justify-content-between align-items-center">
        <Dropdown>
          <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
            <FilterAltIcon></FilterAltIcon>{filteredComp}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => {
                setFlag("true");
                setFilteredComp("Active");
              }}
            >
              Active
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setFlag("true");
                setFilteredComp("Inactive");
              }}
            >
              Inactive
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setFlag("false");
                setFilteredComp("")
              }}
            >
              All
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Link to="/add">
          <Button variant="contained"  size="medium" className="add-btn">Add company</Button>
        </Link>
        </div>
      </div>
      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <Checkbox {...label} />
              </TableCell>
              <TableCell align="left">Company Name</TableCell>
              <TableCell align="left">Location</TableCell>
              <TableCell align="left">Company Type</TableCell>
              <TableCell align="left">Industry</TableCell>
              <TableCell align="left">Stage</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {rows.map((row) => ( */}
            {company
              .filter((company) => {
                return flag==='false'?
                (search.toLowerCase() !== "" ? company.name.toLowerCase().includes(search.toLowerCase()):company)
              : (search.toLowerCase() !== "" ? company.name.toLowerCase().includes(search.toLowerCase()) &&company.stage===filteredComp : company.stage===filteredComp)
              })
              .map((company, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">
                    <Checkbox {...label} id={company.id} />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {company.name}
                  </TableCell>
                  <TableCell align="left">{company.location}</TableCell>
                  <TableCell align="left">{company.compType}</TableCell>
                  <TableCell align="left">{company.industry}</TableCell>
                  <TableCell align="left">
                    <span className="stage" style={makeStyle(company.stage)}>
                      {company.stage}
                    </span>
                  </TableCell>
                  <TableCell align="center" className="action">
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      id={company.id}
                      onClick={(e) => deleteCompany(e)}
                    >
                      Delete
                    </Button>{" "}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
