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
import { CompanyContext, editContext } from "../Context/CompanyContext";
import { useContext } from "react";
import { useEffect } from "react";
// import '../../style.css'
import "../style.css"
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import TablePagination from '@mui/material/TablePagination';
import { TableFooter, capitalize } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';
import { Modal} from 'react-bootstrap';
import {CSVLink} from "react-csv"
import AddCompany from "../AddCompany";
import EditCompany from "../EditCompany";

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

  // const [rows, setRows] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [MasterChecked,setMasterChecked] = useState(false)
  const [selectedCompanies,setSelectedCompanies] = useState([])
  const [show, setShow] = useState(false);
  const[mod,setMod] = useState('')
  const [editid,setId] = useContext(editContext)
  const handleShow = () => {
      setShow(true)
   };
  const handleClose = () => {
    setShow(false)
    setMod('')
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const deleteCompany = (e) => {
    e.preventDefault();

    const filterCompany = company.filter((item) => {
      return item.id !== e.target.id;
    });
    setCompany(filterCompany);
  };


  useEffect(() => {
    localStorage.setItem("company", JSON.stringify(company));
    handleClose()
  }, [company]);

  const onItemCheck = (e, comp) => {
    let tempList = company;
    // console.log(tempList)
    tempList.map((tempcompany) => {
      // console.log(tempcompany)
      if (tempcompany.id === comp.id) {
        tempcompany.selected = e.target.checked;
      }
      return tempcompany;
    }
    )
    const totalItems = company.length;
    const totalCheckedItems = tempList.filter((e) => e.selected).length;
    // Update State
setMasterChecked(totalItems === totalCheckedItems)
setSelectedCompanies(company.filter((e) => e.selected))
 
};

const onMasterCheck=(e) =>{
  let tempList = company;
  // Check/ UnCheck All Items
  tempList.map((company) => (company.selected = e.target.checked));
 
  //Update State
  setSelectedCompanies(company.filter((e) => e.selected))
  setMasterChecked(e.target.checked)
 
}
 
const getSelectedRows =()=> {
  setSelectedCompanies(company.filter((e) => e.selected));
}
const csvData=[
  // getSelectedRows()
  ['Id','Company Name','Location','Company Type','Industry','Stage'],
  selectedCompanies.map(
    ({id,name,location,compType,industry,stage})=>[
    id,name,location,compType,industry,stage
  ])

]


  return (
    <>
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
                placeholder="Type Company Name...."
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

        <CSVLink filename="Company List.csv" data={csvData} className="downloadbtn">
          <Button onClick={getSelectedRows} variant="contained"  size="medium" className="add-btn"><DownloadIcon></DownloadIcon></Button>
        </CSVLink>
              <Button variant="contained"  size="medium" className="add-btn" onClick={()=>{
                setMod('add')
                handleShow()
              }
              } data-toggle="modal"><AddIcon/></Button>					

        {/* <Link to="/add"> 
          <Button variant="contained"  size="medium" className="add-btn"><AddIcon></AddIcon></Button>
         </Link> */}
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
                <Checkbox {...label} checked={MasterChecked} id="mastercheck" onChange={(e) => onMasterCheck(e)}/>
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
            {company && company
              .filter((company) => {
                return flag==='false'?
                (search.toLowerCase() !== "" ? company.name.toLowerCase().includes(search.toLowerCase()):company)
              : (search.toLowerCase() !== "" ? company.name.toLowerCase().includes(search.toLowerCase()) &&company.stage===filteredComp : company.stage===filteredComp)
              })
              .slice(page*rowsPerPage, page*rowsPerPage+rowsPerPage)
              .map((company, index) => (
                <TableRow
                  key={company.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 }}}
                >

                  <TableCell align="left">
                    <Checkbox id='rowcheck{company.id}' checked={company.selected}
                  onChange={(e) => onItemCheck(e, company)}/>
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
                      onClick={()=>{
                        setMod('edit')
                        setId(company)
                        handleShow()
                      }}
                       data-toggle="modal"
                      // onClick={(e) => deleteCompany(e)}
                    >
                      edit
                      {/* Delete */}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TableFooter>
        <div className="pagination">
      <TablePagination
      component="div"
      count={company.length}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={[5, 10, 25,50,100]}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
    </div>
        </TableFooter>
      </TableContainer>
      
    </div>
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
        {/* <Modal.Title>
            ADD
        </Modal.Title> */}
    </Modal.Header>
    <Modal.Body>
        {/* <AddCompany /> */}
       {mod === 'add'?<AddCompany/>:''}
        {mod==='edit'?<EditCompany/>:''}
    </Modal.Body>
    {/* <Modal.Footer>
             <Button variant="secondary" onClick={handleClose}>
                Close Button
            </Button> 
    </Modal.Footer> */}
</Modal>

</>
  );
}
