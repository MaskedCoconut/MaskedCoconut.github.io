import Button from '@mui/material/Button';
import Papa from "papaparse";
import React, { useState } from "react";
import DataGridDemo from '../../components/datagrid';
import Layout from '../../components/layout';

// Allowed extensions for input file
const allowedExtensions = ["csv"];

const App = () => {

    // This state will store the parsed data
    const [data, setData] = useState([]);

    // This state will store the columns formatted for datagrid
    const [columns, setColumns] = useState([]);

    // This state will store the rows formatted for datagrid
    const [rows, setRows] = useState([]);

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
            const csv = Papa.parse(target.result, { header: true });
            const parsedData = csv?.data;
            const columns = Object.keys(parsedData[0]);

            const columns_datagrid = [
                { field: 'id', headerName: 'ID', width: 90 },
            ].concat(columns.map((col) => Object.fromEntries([['field', col], ['headerName', col], ['width', 150], ['editable', true]])));

            const rows_datagrid = parsedData.map((row, idx) => Object.defineProperty(row, 'id', { value: idx }));

            setColumns(columns_datagrid);
            setRows(rows_datagrid);
            setData(parsedData);
            console.log(parsedData);
            console.log(columns_datagrid)
            console.log(rows_datagrid)

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
                    {/* {
                        error ? error :
                            data.map(
                                (col, idx) => <div key={idx}>{col}</div>
                            )
                    } */}
                    <DataGridDemo columns={columns} rows={rows} />
                </div>

            </div>
        </Layout>
    );
};

export default App;

