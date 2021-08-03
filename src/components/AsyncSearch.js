// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import fetch from "cross-fetch";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";


export default function AsyncSearch(props) {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;
    console.log("loading AsyncSearch")
    console.log(props.bookType)

    const onChangeHandle = async value => {
        // use the changed value to make request and then use the result. Which
        console.log(value);
        const response = await fetch(
            `/api/searchBooks?bookType=${props.bookType}&searchTerm=${value}`
        );
        const books = await response.json();
        console.log(books);
        setOptions(Object.keys(books["data"]).map(key => books["data"][key]));
        props.fn(books)
    };

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <Autocomplete
            id="asynchronous-demo"
            style={{ width: 300, marginLeft: "70%" }}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            getOptionSelected={(option, value) => option.title === value.name}
            getOptionLabel={option => option.title}
            options={options}
            loading={loading}
            renderInput={params => (
                <TextField
                    {...params}
                    label="Asynchronous"
                    variant="outlined"
                    onChange={ev => {
                        if (ev.target.value !== "" || ev.target.value !== null) {
                            onChangeHandle(ev.target.value);
                        }
                    }}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? (
                                    <CircularProgress color="inherit" size={20} />
                                ) : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        )
                    }}
                />
            )}
        />
    );
}
