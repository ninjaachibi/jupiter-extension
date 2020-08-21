
import React from "react";

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SectionHeader from "./typo/SectionHeader";
import CircularProgress from '@material-ui/core/CircularProgress';



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
    await fetch(url, opts)
        .then(res => res.json())
        .then(console.log)
        .catch(console.error);
}

export default function NewRecipes() {
    const [queryString, setQueryString] = React.useState(""); // TODO: add typescript
    const [ingredientList, setIngredientList] = React.useState([]); // Array<Ingredient> // TODO: add typescript for an Ingredient {id, name, ct}
    
    React.useEffect(() => {
        searchProducts(query);
    })


    return (
    <SectionHeader
        title="New recipe"
        subtitle="Create a new recipe"
    />
    // TODO: add save, cancel buttons
    );
}

