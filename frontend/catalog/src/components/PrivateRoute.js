import React from "react";
import { Route, Redirect } from "react-router-dom";
import NavMenu from "./NavMenu";

class PrivateRoute extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      schoolYear: "",
    };
  }
  selectYear = (schoolYear) => {
    this.setState({ schoolYear: schoolYear });
    localStorage.setItem("id_an_scolar", schoolYear.id);
  };
  render() {
    let { component: MyComponent, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={(props) =>
          rest.isLoggedIn ? (
            <>
              {rest.navbar ? (
                <NavMenu
                  tip_utilizator={this.props.tip_utilizator}
                  updatePrivateRoutes={rest.updatePrivateRoutes}
                  onSelectYear={this.selectYear}
                  selectedYear={this.state.schoolYear}
                />
              ) : (
                <></>
              )}
              <MyComponent
                {...props}
                key={this.state.schoolYear.id}
                updatePrivateRoutes={rest.updatePrivateRoutes}
              />
            </>
          ) : (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          )
        }
      />
    );
  }
}

/*
export const PrivateRoute = ({ component: MyComponent, ...rest }) => {
    console.log("DRAW")
    return (
        <Route {...rest} render={ props => (
            rest.isLoggedIn
                ? <MyComponent {...props} />
                : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )} />
    );
};
*/
export default PrivateRoute;
