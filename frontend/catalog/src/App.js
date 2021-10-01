import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch /*, Route*/ } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import routes from "./routes";
import Login from "./data/login";
import LoginPage from "./pages/LoginPage";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      update: false,
      selectedYear: "",
    };
  }
  updatePrivateRoutes = () => {
    this.setState({ update: true });
  };
  selectYear = (selectedYear) => {
    localStorage.setItem("id_an_scolar", selectedYear.id);
    this.setState({ selectedYear: selectedYear });
  };
  render() {
    const checkLoggedIn = Login.checkLoggedIn();
    return (
      <Router>
        <Switch>
          {routes.map((route, index) => {
            if (
              route.tip_utilizator == checkLoggedIn.tip_utilizator ||
              route.tip_utilizator == "All"
            )
              return (
                <PrivateRoute
                  key={index}
                  path={route.path}
                  exact={true}
                  navbar={route.navbar}
                  isLoggedIn={route.private ? checkLoggedIn.isLoggedIn : true}
                  updatePrivateRoutes={this.updatePrivateRoutes}
                  component={route.component}
                  tip_utilizator={checkLoggedIn.tip_utilizator}
                  selectedYear={this.state.selectedYear}
                  onSelectYear={this.selectYear}
                />
              );
          })}
        </Switch>
      </Router>
    );
  }
}

export default App;
