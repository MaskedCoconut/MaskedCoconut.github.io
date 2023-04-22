import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import {
    DataGrid, GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport
} from '@mui/x-data-grid';
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import 'simplebar-react/dist/simplebar.min.css';

const useFakeMutation = () => {
    return React.useCallback(
        (newrow) =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (newrow.Category?.trim() === '') {
                        reject(new Error("Error while saving user: name can't be empty."));
                    } else {
                        resolve({ ...newrow, Category: newrow.Category?.toUpperCase() });
                    }
                }, 200);
            }),
        [],
    );
};


export default function DataGridDemo(props) {
    const mutateRow = useFakeMutation();

    const [snackbar, setSnackbar] = React.useState(null);

    const handleCloseSnackbar = () => setSnackbar(null);

    const processRowUpdate = React.useCallback(
        async (newRow) => {
            // Make the HTTP request to save in the backend
            const response = await mutateRow(newRow);
            setSnackbar({ children: 'User successfully saved', severity: 'success' });
            return response;
        },
        [mutateRow],
    );

    const handleProcessRowUpdateError = React.useCallback((error) => {
        setSnackbar({ children: error.message, severity: 'error' });
    }, []);

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                {/* <GridToolbarColumnsButton /> */}
                {/* <GridToolbarFilterButton /> */}
                <GridToolbarDensitySelector />
                <GridToolbarExport />
            </GridToolbarContainer>
        );
    }

    if ((typeof props.rows != "undefined") && (typeof props.columns != "undefined")) {
        return (
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Box sx={{ height: 1000, width: '100%' }}>
                    <DataGrid
                        rows={props.rows}
                        columns={props.columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 20,
                                },
                            },
                        }}
                        pageSizeOptions={[20]}
                        checkboxSelection
                        disableRowSelectionOnClick
                        slots={{ toolbar: CustomToolbar }}
                        processRowUpdate={processRowUpdate}
                        onProcessRowUpdateError={handleProcessRowUpdateError}
                    />
                </Box>
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
        );
    }
}
