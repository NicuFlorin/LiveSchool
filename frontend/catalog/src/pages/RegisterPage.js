import React from "react";
import Login from "../data/login";
import { Form, Button, Spinner, Alert, Card, Col, Row } from "react-bootstrap";
import Scoala from "../data/School";
import SchoolYear from "../data/SchoolYear";
class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nume: "",
      prenume: "",
      email: "",
      parola: "",
      confirma_parola: "",

      nume_scoala: "",
      adresa_scoala: "",
      loading: false,
      error: null,
      data_inceput_semestrul1: "",
      data_sfarsit_semestrul1: "",
      data_inceput_semestrul2: "",
      data_sfarsit_semestrul2: "",
    };
    console.log("Coming from: ", this.getPreviousUrl());
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  isNameValid = (name) => {
    if (!name) {
      return true;
    } else if (/^[a-zA-Z]+$/.test(name)) {
      return true;
    } else {
      return false;
    }
  };

  isEmailValid = (email, test) => {
    if (!email) {
      return false;
    } else if (
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      return true;
    } else {
      if (!test) this.setState({ error: "The email is not valid" });
      return false;
    }
  };
  isPasswordValid = (pass, conf) => {
    if (!pass) {
      return true;
    } else if (/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/.test(pass)) {
      if (pass === conf) {
        return true;
      }

      this.setState({ error: "The passwords must match" });
      return false;
    } else {
      this.setState({
        error:
          "The password must contain atleast 1 uppercase 1 lowercase and 1 number",
      });
      return false;
    }
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
  handleLogin = (e) => {
    const url = this.getPreviousUrl();
    this.props.history.replace({ pathname: "/login", state: { from: url } });
  };

  isDateValid(
    data_inceput_semestrul1,
    data_sfarsit_semestrul1,
    data_inceput_semestrul2,
    data_sfarsit_semestrul2
  ) {
    if (
      data_inceput_semestrul1 > data_sfarsit_semestrul1 ||
      data_inceput_semestrul2 > data_sfarsit_semestrul2
    ) {
      return false;
    }

    if (data_sfarsit_semestrul1 > data_inceput_semestrul2) {
      return false;
    }

    return true;
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ error: null });

    const {
      nume,
      prenume,
      email,
      parola,
      confirma_parola,
      nume_scoala,
      adresa_scoala,
      data_inceput_semestrul1,
      data_sfarsit_semestrul1,
      data_inceput_semestrul2,
      data_sfarsit_semestrul2,
    } = this.state;
    if (
      !nume ||
      !prenume ||
      !email ||
      !parola ||
      !confirma_parola ||
      !nume_scoala ||
      !data_inceput_semestrul1 ||
      !data_sfarsit_semestrul1 ||
      !data_inceput_semestrul2 ||
      !data_sfarsit_semestrul2
    ) {
      return;
    }
    if (
      !this.isEmailValid(email) ||
      !this.isNameValid(nume) ||
      !this.isNameValid(prenume) ||
      !this.isPasswordValid(parola, confirma_parola) ||
      !this.isDateValid(
        data_inceput_semestrul1,
        data_sfarsit_semestrul1,
        data_inceput_semestrul2,
        data_sfarsit_semestrul2
      )
    ) {
      return;
    }

    this.setState({ loading: true });
    let addSchool = await Scoala.addSchool({
      nume: this.state.nume_scoala,
      adresa: this.state.adresa_scoala,
    });
    if (addSchool.ok) {
      let addUser = await Login.register({
        nume: nume,
        prenume: prenume,
        email: email,
        parola: parola,
        tip_utilizator: "Administrator",
        id_scoala: addSchool.id_scoala,
      });
      if (addUser.ok) {
        let addSchoolYear = await SchoolYear.addYear(
          data_inceput_semestrul1,
          data_sfarsit_semestrul1,
          data_inceput_semestrul2,
          data_sfarsit_semestrul2,
          addSchool.id_scoala,
          addUser.id_admin
        );

        this.setState({ error: null, loading: false });
        this.props.updatePrivateRoutes();

        const from = "/";
        this.props.history.replace(from);
      } else {
        this.setState({ error: addUser.message, loading: false });
      }
    } else {
      this.setState({ error: addSchool.message, loading: false });
    }
  };

  render() {
    return (
      <div>
        <Card>
          <Card.Header>Creeaza catalog</Card.Header>
          <Card.Body>
            <Form onSubmit={this.handleSubmit}>
              <Row>
                <Form.Group as={Col}>
                  <Form.Label>Nume</Form.Label>
                  <Form.Control
                    name="nume"
                    value={this.state.nume}
                    onChange={this.handleChange}
                    type="text"
                    placeholder="Nume"
                    isInvalid={!this.isNameValid(this.state.nume)}
                    required
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Invalid first name !
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Prenume</Form.Label>
                  <Form.Control
                    name="prenume"
                    value={this.state.prenume}
                    onChange={this.handleChange}
                    type="text"
                    placeholder="Prenume"
                    isInvalid={!this.isNameValid(this.state.prenume)}
                    required
                  />

                  <Form.Control.Feedback type="invalid">
                    Prenume invalid !
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    type="email"
                    placeholder="Enter email"
                    isInvalid={!this.isEmailValid(this.state.email, true)}
                    required
                  />

                  {this.isEmailValid(this.state.email, true) ? (
                    <Form.Text className="text-muted">Email valid</Form.Text>
                  ) : (
                    <Form.Control.Feedback type="invalid">
                      Invalid email !
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col}>
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
                <Form.Group as={Col}>
                  <Form.Label>Confirma parola</Form.Label>
                  <Form.Control
                    name="confirma_parola"
                    value={this.state.confirma_parola}
                    onChange={this.handleChange}
                    type="password"
                    placeholder="Confirma parola"
                    required
                  />
                </Form.Group>
              </Row>

              <Form.Group>
                <Form.Label>Numele scolii</Form.Label>
                <Form.Control
                  name="nume_scoala"
                  value={this.state.nume_scoala}
                  onChange={this.handleChange}
                  type="text"
                  placeholder="Numele scolii"
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Adresa scolii</Form.Label>
                <Form.Control
                  name="adresa_scoala"
                  value={this.state.adresa_scoala}
                  onChange={this.handleChange}
                  type="text"
                  placeholder="Adresa scolii"
                  required
                />
              </Form.Group>

              <Row>
                <Form.Group as={Col}>
                  <Form.Label>Data inceput semestrul 1</Form.Label>
                  <Form.Control
                    type="date"
                    name="data_inceput_semestrul1"
                    onChange={this.handleChange}
                    placeholder="Data inceput semestrul 1"
                    required
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Data sfarsit semestrul 1</Form.Label>
                  <Form.Control
                    type="date"
                    name="data_sfarsit_semestrul1"
                    onChange={this.handleChange}
                    placeholder="Data sfarsit semestrul 1"
                    required
                  />
                </Form.Group>
              </Row>

              <Row>
                <Form.Group as={Col}>
                  <Form.Label>Data inceput semestrul 2</Form.Label>
                  <Form.Control
                    type="date"
                    name="data_inceput_semestrul2"
                    onChange={this.handleChange}
                    placeholder="Data inceput semestrul 2"
                    required
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Data sfarsit semestrul 2</Form.Label>
                  <Form.Control
                    type="date"
                    name="data_sfarsit_semestrul2"
                    onChange={this.handleChange}
                    placeholder="Data sfarsit semestrul 2"
                    required
                  />
                </Form.Group>
              </Row>

              <Form.Group>
                <Button
                  variant="success"
                  type="submit"
                  disabled={this.state.loading}
                >
                  {this.state.loading ? (
                    <>
                      <Spinner animation="border" size="sm" />
                      {" Loading ..."}
                    </>
                  ) : (
                    "Inregistreaza catalog"
                  )}
                </Button>
                <Button
                  className="right-button"
                  variant="link"
                  onClick={this.handleLogin}
                >
                  Ai un cont de utilizator? Autentifica-te
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
export default RegisterPage;
