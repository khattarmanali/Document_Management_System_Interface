import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import JSZip from "jszip";
import FileSaver from "file-saver";

const DocumentTable = ({ data }) => {
  const [selectedDocument, setSelectedDocument] = useState(null);

  const handleDownloadSingle = () => {
    if (selectedDocument) {
      const blob = new Blob([JSON.stringify(selectedDocument, null, 2)], {
        type: "application/json",
      });
      FileSaver.saveAs(blob, `document_${selectedDocument.document_id}.json`);
    }
  };

  const handleDownloadAll = () => {
    const zip = new JSZip();
    data.forEach((document) => {
      zip.file(
        `document_${document.document_id}.json`,
        JSON.stringify(document, null, 2)
      );
    });
    zip.generateAsync({ type: "blob" }).then((content) => {
      FileSaver.saveAs(content, "documents.zip");
    });
  };

  const handlePreview = (url) => {
    window.open(url, "_blank");
  };

  return (
    <>
      <Button onClick={handleDownloadAll}>Download All as ZIP</Button>
      <div style={{ overflowX: "auto" }}>
        {" "}
        {/* Changed overflowX to auto */}
        <TableContainer
          component={Paper}
          sx={{
            minWidth: 250,
            width: "100%",
            maxWidth: {
              xs: 300,
              sm: 300,
              md: 1000,
              lg: 1000,
              xl: 1000,
            },
          }}
        >
          <Table
            sx={{ minWidth: 250, tableLayout: "auto" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Document ID</TableCell>
                <TableCell>Major Head</TableCell>
                <TableCell>Minor Head</TableCell>
                <TableCell>Document Date</TableCell>
                <TableCell>Document Remarks</TableCell>
                <TableCell>Upload Time</TableCell>
                <TableCell>Uploaded By</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((document) => (
                <TableRow
                  key={document.document_id}
                  onClick={() => setSelectedDocument(document)}
                  style={{ cursor: "pointer" }}
                  selected={selectedDocument === document}
                >
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
                  <TableCell>
                    <Button onClick={() => handlePreview(document.file_url)}>
                      Preview
                    </Button>
                    <Button onClick={handleDownloadSingle}>Download</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default DocumentTable;
