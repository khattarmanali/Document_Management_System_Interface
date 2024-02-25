import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const DocumentTable = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Document ID</TableCell>
            <TableCell>Major Head</TableCell>
            <TableCell>Minor Head</TableCell>
            <TableCell>Document Date</TableCell>
            <TableCell>Document Remarks</TableCell>
            <TableCell>Upload Time</TableCell>
            <TableCell>Uploaded By</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((document) => (
            <TableRow key={document.document_id}>
              <TableCell>{document.document_id}</TableCell>
              <TableCell>{document.major_head}</TableCell>
              <TableCell>{document.minor_head}</TableCell>
              <TableCell>
                {new Date(document.document_date).toLocaleDateString()}
              </TableCell>
              <TableCell>{document.document_remarks}</TableCell>
              <TableCell>
                {new Date(document.upload_time).toLocaleString()}
              </TableCell>
              <TableCell>{document.uploaded_by}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DocumentTable;
