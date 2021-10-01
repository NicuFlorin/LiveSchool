import React from "react";
import Login from "../data/login";
import { Form, Button, Spinner, Alert, Card } from "react-bootstrap";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      parola: "",
      loading: false,
      error: null,
    };
    console.log("Coming from: ", this.getPreviousUrl());
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleRegister = (e) => {
    const url = this.getPreviousUrl();
    this.props.history.replace({ pathname: "/register", state: { from: url } });
    //this.props.history.replace('/register')
  };

  getPreviousUrl = () => {
    // or 'from' object
    if (this.props.location.state && this.props.location.state.from) {
      return this.props.location.state.from;
    } else if (window.history.state && window.history.state.previousUrl) {
      return window.history.state.previousUrl;
    } else {
      return { pathname: "/" };
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { email, parola } = this.state;

    // Stop here if the form is empty or invalid
    if (!email || !parola) {
      return;
    }
    if (!this.isEmailValid(email)) {
      return;
    }

    // Make the API request
    this.setState({ loading: true });
    Login.login(email, parola).then((res) => {
      if (res.ok) {
        this.setState({ error: null, loading: false });
        this.props.updatePrivateRoutes();

        const from = "/";
        this.props.history.replace(from);
      } else {
        this.setState({ error: res.message, loading: false });
      }
    });
  };

  isEmailValid = (email) => {
    if (!email) {
      return false;
    } else if (
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      return true;
    } else {
      return false;
    }
  };
  render() {
    return (
      <div>
        <Card>
          <Card.Header>Login</Card.Header>
          <Card.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  name="email"
                  value={this.state.email}
                  type="email"
                  isInvalid={!this.isEmailValid}
                  onChange={this.handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Invalid email !
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Parola</Form.Label>
                <Form.Control
                  name="parola"
                  value={this.state.parola}
                  onChange={this.handleChange}
                  type="password"
                  placeholder="Parola"
                  required
                />
              </Form.Group>
              <Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={this.state.loading}
                >
                  {this.state.loading ? (
                    <>
                      <Spinner animation="border" size="sm" />
                      {" Loading ..."}
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
                <Button
                  className="right-button"
                  variant="link"
                  onClick={this.handleRegister}
                >
                  Creeaza catalog
                </Button>
              </Form.Group>
              {this.state.error != null ? (
                <Alert style={{ margin: 0 }} variant="danger">
                  {this.state.error}
                </Alert>
              ) : (
                <></>
              )}
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default LoginPage;
