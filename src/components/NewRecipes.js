
import React from "react";

import TextField from '@material-ui/core/TextField';
import SectionHeader from "./typo/SectionHeader";
import CircularProgress from '@material-ui/core/CircularProgress';
import { Autocomplete } from '@material-ui/lab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DeleteIcon from '@material-ui/icons/Delete';

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
                            newIngredientList[val.productId.value] = { ...val, count: 1 };
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
            <div className="new-recipe-title">
                <TextField id="standard-basic" label="Recipe Name" />
            </div>
            <div className="new-recipe-list">
                <List >
                    {Object.values(ingredientList).map((ingredient) =>
                        <ListItem key={ingredient.productId.value} divider>
                            <ListItemIcon>
                                {/* TODO: handle 0 and negative */}
                                <TextField
                                    id="outlined-number"
                                    label="Number"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    value={ingredient.count}
                                    onChange={(evt) => {
                                        const newIngredientList = { ...ingredientList };
                                        // console.log(ingredient)
                                        newIngredientList[ingredient.productId.value].count = parseInt(evt.target.value)
                                        setIngredientList(newIngredientList);
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText
                                primary={`${ingredient.name}`}
                            />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete">
                                    {/* TODO: add deletion functionality w/ pressing the icon */}
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>,
                    )}
                </List>
            </div>
        </>
    );
}

