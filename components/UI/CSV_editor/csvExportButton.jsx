import Button from "@mui/material/Button";
import Papa from "papaparse";
import React from "react";

const CsvExportButton = ({ data, filename }) => {
  const handleExport = () => {
    const csv = Papa.unparse(data);

    // Create a Blob and a link to trigger the download
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");

    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, filename);
    } else {
      // Other browsers
      const url = URL.createObjectURL(blob);

      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <Button variant="contained" color="primary" onClick={handleExport}>
      Export to CSV
    </Button>
  );
};

export default CsvExportButton;
