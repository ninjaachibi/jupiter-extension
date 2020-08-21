
import React from "react";

import TextField from '@material-ui/core/TextField';
import SectionHeader from "./typo/SectionHeader";
import CircularProgress from '@material-ui/core/CircularProgress';
import { Autocomplete } from '@material-ui/lab';

const query = `
query myQuery($queryString: String!) {
  search(query: $queryString, page: 0) {
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
};

async function searchProducts(queryString) {
    try {
        const response = await fetch(url, {
            ...opts,
            body: JSON.stringify({
                query,
                variables: { queryString }
            })
        })
            .then(res => res.json())
        console.log(queryString, response.data.search)
        return response;
    }
    catch (e) {
        console.error(e);
    }

}

export default function NewRecipes() {
    const [queryString, setQueryString] = React.useState(""); // TODO: add typescript
    // TODO: add typescript for an RecipeItem {productId, name, ct}
    const [ingredientList, setIngredientList] = React.useState({}); // Map<productId => <RecipeItem>>

    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    React.useEffect(() => {
        let active = true;

        // if (!loading) {
        //     return undefined;
        // }

        (async () => {
            const response = await searchProducts(queryString);
            console.log(response.data.search)

            if (active) {
                setOptions(response.data.search)
            }
        })();

        return () => {
            active = false;
        };
    }, [loading, queryString]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);
    // TODO: add save, cancel buttons

    return (
        <>
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
                onChange={(evt, val, reason) => {
                    console.log(evt, val, reason)
                    if (reason === 'select-option') {
                        const newIngredientList = { ...ingredientList };
                        if (newIngredientList[val.productId.value] != null) {
                            newIngredientList[val.productId.value].count++;
                        }
                        else {
                            newIngredientList[val.productId.value] = {...val, count:1};
                        }

                        setIngredientList(newIngredientList); 
                        setQueryString("")
                    }
                }}
                getOptionSelected={(option, value) => option.name === value.name} // TODO: suppress warning
                getOptionLabel={(option) => option.name}
                options={options}
                loading={loading}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        onChange={(evt) => {
                            // console.log(evt.target.value); 
                            setQueryString(evt.target.value);
                        }}
                        value={queryString}
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

            {/* recipes here */}
            Current Recipe
            <div>
                {Object.values(ingredientList).map((ingredient) =>
                    <ul key={ingredient.productId.value}>{`${ingredient.name} count:${ingredient.count}`}</ul>
                )}
            </div>
        </>
    );
}

