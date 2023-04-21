import Papa from "papaparse";

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
        console.log(parsedData);

    };
    reader.readAsText(file);
};

export default handleSubmit;