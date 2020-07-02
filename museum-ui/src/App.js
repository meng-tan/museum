import React from 'react';
import Header from './components/Header';
import Checkout from './components/checkout';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./components/home"
import ExhibitionContainer from "./components/exhibitions"
import Ticket from "./components/tickets"
import Auth from './components/auth/Auth';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Orders from "./components/orders"
import UserService from './components/service/UserService'
import Typography from '@material-ui/core/Typography';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={props =>
    UserService.getInstance().isLoggedIn()
      ? <Component {...props} />
      : <Redirect to={{ pathname: "/auth" }} />
  } />
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Header />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />

          <Route exact path="/auth" component={Auth} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />

          <Route exact path="/exhibitions" component={ExhibitionContainer} />
          <Route exact path="/exhibitions/id/:id" component={Ticket} />

          <ProtectedRoute exact path="/exhibitions/id/:id/checkout" component={Checkout} />
          <ProtectedRoute exact path="/orders" component={Orders} />

          <Route render={() => <Typography align="center" variant="subtitle2">Page Not Found</Typography>} />
        </Switch>

      </BrowserRouter>
    </div>

  );
}

export default App;
