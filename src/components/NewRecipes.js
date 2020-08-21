
import React from "react";

import TextField from '@material-ui/core/TextField';
import SectionHeader from "./typo/SectionHeader";
import CircularProgress from '@material-ui/core/CircularProgress';
import { Autocomplete } from '@material-ui/lab';

const query = `
query searchProduct {
  search(query: "bread", page: 1) {
    productId {
      value
    }
    name
  }
}`
const url = 'https://graphql.jupiter.co/';
const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query })
};

async function searchProducts(query) {
    try {
        const response = await fetch(url, opts)
            .then(res => res.json())
        // console.log(response)
        return response;
    }
    catch (e) {
        console.error(e);
    }

}

export default function NewRecipes() {
    const [queryString, setQueryString] = React.useState(""); // TODO: add typescript
    const [ingredientList, setIngredientList] = React.useState([]); // Array<Ingredient> // TODO: add typescript for an Ingredient {id, name, ct}

    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            const response = await searchProducts(query);
            console.log(response.data.search)

            if (active) {
                setOptions(response.data.search)
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);
    // TODO: add save, cancel buttons

    return (<>
        <SectionHeader
            title="New recipe"
            subtitle="Create a new recipe"
        />
        <Autocomplete
            id="asynchronous-demo"
            style={{ width: 300 }}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            getOptionSelected={(option, value) => option.name === value.name}
            getOptionLabel={(option) => option.name}
            options={options}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Search for ingredients"
                    variant="outlined"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    </>
    );
}

