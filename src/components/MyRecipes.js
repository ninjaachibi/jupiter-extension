import React, { useEffect, useState, useContext } from "react";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';
import SectionHeader from "./typo/SectionHeader";


import { UserContext } from "../providers/UserProvider";
import { auth } from "../firebase"; // for sign out
import ButtonBar from "./buttons/ButtonBar";

function MyRecipes(props) {
    const user = useContext(UserContext);
    // const currentPath = this.props.location.pathname;
    const [recipes, setRecipes] = useState([])

    const getRecipes = async (uid) => {
        // const url = `https://postman-echo.com/get?foo1=bar1&foo2=bar2`
        const url = `http://localhost:5001/jupiter-extension-robert/us-central1/webApi/recipes?uid=${uid}`

        const apiCall = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })

        const data = await apiCall.json()
        // .then((response) => {
        //     console.log(response);
        //     return response.json();
        // })

        console.log(data);
        setRecipes(data);
    }


    useEffect(() => {
        getRecipes(user.uid);
        // TODO: listen for live events use event listener to update for multiple users
    }, [user.uid])

    return (
        <div className="myRecipes">
            <SectionHeader
                title="My recipes"
                subtitle="See and Modify existing recipes"
            />
            {
                recipes.map(({ ingredientList, name }) => {
                    return (
                        <Paper styles={{ padding: 10, margin: 10 }}>
                            <SectionHeader
                                title={name}
                            />
                            <List>
                                {ingredientList.map((ingredient) =>
                                    <ListItem key={ingredient.productId} >
                                        <ListItemText
                                            primary={`${ingredient.name}`}
                                        />
                                    </ListItem>

                                )}
                            </List>
                            <ButtonBar
                                leftText="Modify"
                                rightText="Delete"
                            />
                        </Paper>)
                })
            }
        </div>
    );

}

export default MyRecipes;