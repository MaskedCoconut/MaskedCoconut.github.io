import Button from '@mui/material/Button';
import Papa from "papaparse";
import React, { useState } from "react";
import DataGridDemo from '../../components/datagrid';
import Layout from '../../components/layout';
import { Stack, Alert, Box, Container, Snackbar, Chip } from '@mui/material';



// Allowed extensions for input file
const allowedExtensions = ["csv"];

const App = () => {

    const [snackbar, setSnackbar] = React.useState(null);
    const handleCloseSnackbar = () => setSnackbar(null);

    // This state will store the parsed data
    const [data, setData] = useState([]);

    // This state will store the columns formatted for datagrid
    const [columns, setColumns] = useState([]);

    // This state will store the rows formatted for datagrid
    const [rows, setRows] = useState([]);

    // It will store the file uploaded by the user
    const [file, setFile] = useState("");

    // This function will be called when
    // the file input changes
    const handleFileChange = (e) => {

        // Check if user has entered the file
        if (e.target.files.length) {
            const inputFile = e.target.files[0];

            // Check the file extensions, if it not
            // included in the allowed extensions
            // we show the error
            const fileExtension = inputFile?.type.split("/")[1];
            if (!allowedExtensions.includes(fileExtension)) {
                setSnackbar({ children: 'Only .csv are accepted', severity: 'error' });
                return;
            }

            // If input type is correct set the state
            setFile(inputFile);
            setSnackbar({ children: '.csv file found', severity: 'success' });
        }
    };

    const handleParse = () => {

        // If user clicks the parse button without
        // a file we show a error
        if (!file) return setSnackbar({ children: 'select a csv file first', severity: 'error' });

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

            const rows_datagrid = parsedData.map((row, idx) => Object.assign({ id: idx }, row));

            setColumns(columns_datagrid);
            setRows(rows_datagrid);
            setData(parsedData);
        };
        reader.readAsText(file);
    };

    return (
        <Layout>
            <div>
                <Stack direction="column" spacing={2}>
                    <h1>
                        Enter CSV File
                    </h1>

                    <Stack direction="row" spacing={2} justifyContent="center">

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
                        <Button
                            variant="contained"
                            component="label"
                            onClick={handleParse}
                        >
                            Parse
                        </Button>
                    </Stack>
                    <Chip label={file && `${file.name} - ${file.type}`}></Chip>
                    <DataGridDemo columns={columns} rows={rows} />
                    {!!snackbar && (
                        <Snackbar
                            open
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                            onClose={handleCloseSnackbar}
                            autoHideDuration={6000}
                        >
                            <Alert {...snackbar} onClose={handleCloseSnackbar} />
                        </Snackbar>
                    )}
                </Stack>

            </div>
        </Layout >
    );
};

export default App;

