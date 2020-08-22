import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import CardItem from "./cards/CardItem";
import SectionHeader from "./typo/SectionHeader";
import NewRecipes from "./NewRecipes"
import { auth } from "../firebase"; // for sign out
import { Button } from "@material-ui/core";


const backgroundShape = require("../images/shape.svg");

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.grey["A500"],
        overflow: "hidden",
        background: `url(${backgroundShape}) no-repeat`,
        backgroundSize: "cover",
        backgroundPosition: "0 400px",
        marginTop: 20,
        padding: 20,
        paddingBottom: 200
    },
    grid: {
        width: 1000
    }
});

class Recipes extends Component {
    render() {
        const { classes } = this.props;
        // const currentPath = this.props.location.pathname;

        return (
            <React.Fragment>
                <CssBaseline />
                <div className={classes.root}>
                    <Grid container justify="center">
                        <Grid
                            spacing={10}
                            alignItems="center"
                            justify="center"
                            container
                            className={classes.grid}
                        >
                            <Grid item xs={12}>
                                <Button onClick={() => auth.signOut()} type="primary">Logout</Button>
                                <Button type="primary">Refresh Page</Button>
                                {/* TODO: New recipes component */}
                                <NewRecipes />
                                <SectionHeader
                                    title="My recipes"
                                    subtitle="See and Modify existing recipes"
                                />
                                {/* TODO: MyRecipes component */}
                                <CardItem />
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Recipes);
