import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nume: "",
      prenume: "",
      email: "",
      telefon: "",
      adresa: "",
      data_nasterii: "",
      resetPass: false,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    this.setState({
      nume: this.props.user.nume,
      prenume: this.props.user.prenume,
      email: this.props.user.email,
      telefon: this.props.user.telefon,
      adresa: this.props.user.adresa,
      data_nasterii: this.props.user.data_nasterii,
    });
  }

  checkUpdate = () => {
    if (
      this.state.nume == "" ||
      this.state.prenume == "" ||
      this.state.email == ""
    ) {
      alert("actualizare invalida");
      return;
    } else {
      this.props.onUpdate(this.state);
    }
  };

  render() {
    return (
      <Form>
        <Row>
          <Form.Group as={Col}>
            <Form.Label>Nume</Form.Label>
            <Form.Control
              name="nume"
              value={this.state.nume}
              placeholder="Nume"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Prenume</Form.Label>
            <Form.Control
              name="nume"
              placeholder="Prenume"
              value={this.state.prenume}
              onChange={this.handleChange}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col}>
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              value={this.state.email}
              type="email"
              placeholder="Email"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Telefon</Form.Label>
            <Form.Control
              name="telefon"
              type="phone"
              placeholder="Telefon"
              value={this.state.telefon}
              onChange={this.handleChange}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col}>
            <Form.Label>Data nasterii</Form.Label>
            <Form.Control
              name="data_nasterii"
              value={this.state.data_nasterii}
              type="date"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Adresa</Form.Label>
            <Form.Control
              name="adresa"
              placeholder="Adresa"
              value={this.state.adresa}
              onChange={this.handleChange}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Check
            as={Col}
            style={{ marginLeft: "10px" }}
            type="checkbox"
            name="resetPass"
            label="Reseteaza parola"
            onChange={this.handleChange}
          />
        </Row>
        <Form.Group>
          <Button variant="primary" onClick={() => this.checkUpdate()}>
            Actualizeaza
          </Button>
          <Button variant="danger" onClick={() => this.props.onDelete()}>
            Sterge
          </Button>
        </Form.Group>
      </Form>
    );
  }
}

export default UserForm;
