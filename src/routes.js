import React from 'react'
import { Route, HashRouter, Switch, Redirect } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Wizard from './components/Wizard'
import Cards from './components/Cards'
import Main from './components/Main'
import Signup from './components/Signup'
import ScrollToTop from './components/ScrollTop'
import Recipes from './components/Recipes'
import Login from './components/Login'

const user = null;


function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/signup",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}

export default function (props) {

  return (
    <HashRouter>
      <ScrollToTop>
        <Switch>
          <Route exact path='/' component={Main} />
          <PrivateRoute exact path='/recipes' >
            <Recipes />
          </PrivateRoute>
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/wizard' component={Wizard} />
          <Route exact path='/cards' component={Cards} />
          <Route exact path='/login'>
            <Login />
          </Route>
        </Switch>
      </ScrollToTop>
    </HashRouter>
  );
}