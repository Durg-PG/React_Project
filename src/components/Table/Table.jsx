import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";
import Button from "@mui/material/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/esm/Col";
import InputGroup from "react-bootstrap/InputGroup";
import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { CompanyContext, editContext } from "../../context/CompanyContext";
import { useContext } from "react";
import { useEffect } from "react";
import "../../style.css";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import TablePagination from "@mui/material/TablePagination";
import { Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Modal } from "react-bootstrap";
import AddForm from "../Form/AddForm";
import EditForm from "../Form/EditForm";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import CSV from "../Csv";

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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [MasterChecked, setMasterChecked] = useState(false);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [show, setShow] = useState(false);
  const [mod, setMod] = useState("");
  const [editId,setId] = useContext(editContext);
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
    setMod("");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const getSelectedRows = () => {
    setSelectedCompanies(company.filter((e) => e.selected));
  };

  const deleteCompany = (e) => {
    e.preventDefault();

    const filterCompany = company.filter((item) => {
      return item.id !== e.target.id;
    });
    setCompany(filterCompany);
    toast.error("Company Deleted Successfully!"
    , {
      position: toast.POSITION.TOP_CENTER,
    }
    );
  };

  const onItemCheck = (e, comp) => {
    comp.selected = e.target.checked;
    getSelectedRows();
  };

  const onMasterCheck = (e) => {
    company.map((comp) => (comp.selected = e.target.checked));
    getSelectedRows();
  };

  useEffect(() => {
    localStorage.setItem("company", JSON.stringify(company));
    handleClose();
    // getSelectedRows();
    setSelectedCompanies(company.filter((e) => e.selected));
    // setMasterChecked(selectedCompanies.length === company.length);
  }, [company]);

  useEffect(() => {
    setMasterChecked(selectedCompanies.length === company.length);
  }, [selectedCompanies,company.length]);

  return (
    <>
      <div className="Table">
        <div className="headerRow">
          <div className="left">
            <h2 style={{ color: "#253053" }}>Companies</h2>

            <div className="input-searchform">
              <Form.Group as={Col}>
                <InputGroup>
                  <InputGroup.Text>
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
                    placeholder="Search Company Name...."
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
            </div>
            <Dropdown fontSize="small">
              <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
                <FilterAltIcon fontSize="small"></FilterAltIcon>

                {filteredComp}
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
                    setFilteredComp("");
                  }}
                >
                  All
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="right">
            {selectedCompanies.length !== 0 ? (
              <CSV selectedCompanies={selectedCompanies} />
            ) : (
              ""
            )}
            <Button
              variant="contained"
              size="small"
              className="add-btn"
              onClick={() => {
                setMod("add");
                handleShow();
              }}
              data-toggle="modal"
              sx={{ background: "#19376D" }}
            >
              <AddIcon />
            </Button>
          </div>
        </div>
        <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
        >
          <Table
            sx={{
              minWidth: 300,
            }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <Checkbox
                    {...label}
                    checked={MasterChecked}
                    id="mastercheck"
                    onChange={(e) => onMasterCheck(e)}
                  />
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
              {company &&
                company
                  .filter((company) => {
                    return flag === "false" //default active/inactive filter 
                      ? search.toLowerCase() !== ""
                        ? company.name
                            .toLowerCase()
                            .includes(search.toLowerCase())
                        : company
                      : search.toLowerCase() !== ""
                      ? company.name
                          .toLowerCase()
                          .includes(search.toLowerCase()) &&
                        company.stage === filteredComp
                      : company.stage === filteredComp;
                  })
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((company) => (
                    <TableRow
                      key={company.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left">
                        <Checkbox
                          id={company.id}
                          checked={Boolean(company.selected)}
                          onChange={(e) => onItemCheck(e, company)}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{
                          maxWidth: 200,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <Tooltip title={company.name} placement="bottom-start">
                          <>
                          {company.name}
                          </>
                        </Tooltip>
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          maxWidth: 200,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <Tooltip
                          title={company.location}
                          placement="bottom-start"
                        >
                          <>
                          {company.location}
                          </>
                          </Tooltip>
                      </TableCell>
                      <TableCell align="left">{company.compType}</TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          maxWidth: 100,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <Tooltip
                          title={company.industry}
                          placement="bottom-start"
                        >
                          <>
                          {company.industry}
                          </>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="left">
                        <span
                          className="stage"
                          style={makeStyle(company.stage)}
                        >
                          {company.stage}
                        </span>
                      </TableCell>
                      <TableCell align="left" className="action">
                        <Button
                          variant="outlined"
                          size="small"
                          id={company.id}
                          onClick={() => {
                            setMod("edit");
                            setId(company);
                            handleShow();
                          }}
                          data-toggle="modal"
                        >
                          Edit
                        </Button>
                        <Button
                          className="deletebtn"
                          variant="contained"
                          color="error"
                          size="small"
                          id={company.id}
                          onClick={(e) => deleteCompany(e)}
                          sx={{ marginLeft: "20px" }}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
              <TablePagination
                sx={{
                  justifyContent: "left",
                  display: "flex",
                }}
                component="div"
                count={company.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            
        </TableContainer>
     
        </div>
  
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {mod === "add" ? <AddForm /> : ""}
          {mod === "edit" ? <EditForm /> : ""}
        </Modal.Body>
      </Modal>
    </>
  );
}