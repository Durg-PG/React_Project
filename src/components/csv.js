import React from "react";
import DownloadIcon from "@mui/icons-material/Download";
import { CSVLink } from "react-csv";
import Button from "@mui/material/Button";

export default function CSV({selectedCompanies}) {

    const csvData = [
        // getSelectedRows()
        ['Id','Company Name','Location','Company Type','Industry','Stage'],
        ...selectedCompanies.map(
          (item)=>[
          item.id,item.name,item.location,item.compType,item.industry,item.stage
        ])
      ]

  return (
    <>
      <CSVLink
        filename="Company List.csv"
        data={csvData}
        className="downloadbtn"
      >
        <Button
        //   onClick={getSelectedRows}
          variant="contained"
          size="small"
          className="csv-btn"
        >
          <DownloadIcon />
        </Button>
      </CSVLink>
    </>
  );
}
