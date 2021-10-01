import { resetWarningCache } from "prop-types";
import React from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import SelectClass from "./SelectClass";
class AddUserModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nume: "",
      prenume: "",
      email: "",
      telefon: "",
      data_nasterii: "",
      adresa: "",
      id_clasa: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  genereazaParola = (length) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  submit = (e) => {
    e.preventDefault();
    if (
      this.state.nume == "" &&
      this.state.prenume == "" &&
      this.state.email == ""
    ) {
      return;
    } else {
      let user = this.state;
      if (user.tip_utilizator == "Elev" && this.state.id_clasa == "") {
        return;
      }
      user.id_clasa = this.state.id_clasa;
      user.parola = "User1234";
      user.tip_utilizator = this.props.tip_utilizator;
      this.props.addUser(this.state);
    }

    this.props.onHide();
  };

  selectClass = (id_clasa) => {
    this.setState({ id_clasa: id_clasa });
  };
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Adauga {this.props.tip_utilizator}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.clase && (
            <div style={{ width: "50%" }}>
              <Col>
                <SelectClass
                  clase={this.props.clase}
                  onSelectClass={this.selectClass}
                />
              </Col>
              <Col></Col>
            </div>
          )}
          <Form>
            <Row>
              <Form.Group as={Col}>
                <Form.Label>Nume(*)</Form.Label>
                <Form.Control
                  name="nume"
                  placeholder="Nume"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Prenume(*)</Form.Label>
                <Form.Control
                  name="prenume"
                  placeholder="Prenume"
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col}>
                <Form.Label>Email(*)</Form.Label>
                <Form.Control
                  name="email"
                  placeholder="Email"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Telefon</Form.Label>
                <Form.Control
                  name="telefon"
                  placeholder="Nr. telefon"
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col}>
                <Form.Label>Adresa</Form.Label>
                <Form.Control
                  name="adresa"
                  placeholder="Adresa"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Data nasterii</Form.Label>
                <Form.Control
                  name="data_nasterii"
                  type="date"
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => this.props.onHide()}>
            Close
          </Button>
          <Button variant="primary" onClick={this.submit}>
            Adauga
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default AddUserModal;
