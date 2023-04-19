import React, { ChangeEvent, useState, useRef } from "react";
import Papa from "papaparse";
import Button from '@mui/material/Button';
import Layout from '../../components/layout';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// Allowed extensions for input file
const allowedExtensions = ["csv"];

const App = () => {

    // This state will store the parsed data
    const [data, setData] = useState([]);

    // It state will contain the error when
    // correct file extension is not used
    const [error, setError] = useState("");

    // It will store the file uploaded by the user
    const [file, setFile] = useState("");

    // This function will be called when
    // the file input changes
    const handleFileChange = (e) => {
        setError("");

        // Check if user has entered the file
        if (e.target.files.length) {
            const inputFile = e.target.files[0];

            // Check the file extensions, if it not
            // included in the allowed extensions
            // we show the error
            const fileExtension = inputFile?.type.split("/")[1];
            if (!allowedExtensions.includes(fileExtension)) {
                setError("Please input a csv file");
                return;
            }

            // If input type is correct set the state
            setFile(inputFile);
        }
    };
    const handleParse = () => {

        // If user clicks the parse button without
        // a file we show a error
        if (!file) return setError("Enter a valid file");

        // Initialize a reader which allows user
        // to read any file or blob.
        const reader = new FileReader();

        // Event listener on reader when the file
        // loads, we parse it and set the data.
        reader.onload = async ({ target }) => {
            const csv = Papa.parse(target.result, { header: false });
            const parsedData = csv?.data;
            const columns = Object.keys(parsedData[0]);
            setData(parsedData);
        };
        reader.readAsText(file);
    };

    return (
        <Layout>
            <div>
                <label htmlFor="csvInput" style={{ display: "block" }}>
                    Enter CSV File
                </label>
                <Button
                    variant="contained"
                    component="label"
                >
                    Select .csv
                    <input
                        onChange={handleFileChange}
                        id="csvInput"
                        hidden
                        type="File"
                    />
                </Button>
                <div>{file && `${file.name} - ${file.type}`}</div>
                <div>
                    <Button
                        variant="contained"
                        component="label"
                        onClick={handleParse}
                    >
                        Parse
                    </Button>
                </div>
                <div>
                    {
                        error ? error :
                            data.map(
                                (col, idx) => <div key={idx}>{col}</div>
                            )
                    }
                </div>

            </div>
        </Layout>
    );
};

export default App;

