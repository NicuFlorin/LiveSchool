import React from "react";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import Repartizare from "../data/Repartizare";

class AddRepartizareModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id_clasa: "",
      id_disciplina: "",
      claseDisponibile: [],
    };
  }

  getClaseDisponibile = () => {
    if (this.state.claseDisponibile.length == 0) {
      return this.props.clase;
    } else return this.state.claseDisponibile;
  };

  submit = () => {
    if (this.state.id_disciplina == "" || this.state.id_clasa == "") {
      return;
    } else {
      this.props.onAddRepartizare(this.state);
    }
  };

  handleChange = async (e) => {
    const index = e.target.selectedIndex;
    const optionElement = e.target.childNodes[index];
    const optionElementId = optionElement.getAttribute("id");

    if (e.target.name == "id_disciplina") {
      debugger;
      let claseDisponibile = await Repartizare.getClaseDisponibile(
        optionElementId
      );
      if (claseDisponibile.ok)
        this.setState({ claseDisponibile: claseDisponibile.clase });
    }

    this.setState({ [e.target.name]: optionElementId });
  };

  render() {
    let discipline = this.props.discipline;
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Adauga Repartizare</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Form.Group as={Col}>
                <Form.Label>Disciplina(*)</Form.Label>
                <Form.Control
                  name="id_disciplina"
                  as="select"
                  onChange={this.handleChange}
                >
                  <option selected disabled hidden>
                    Alege disciplina
                  </option>
                  {discipline.map((disciplina, index) => {
                    return (
                      <option id={disciplina.id}>{disciplina.denumire}</option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Clasa(*)</Form.Label>
                <Form.Control
                  name="id_clasa"
                  as="select"
                  onChange={this.handleChange}
                >
                  <option disabled hidden selected>
                    Alege clasa
                  </option>
                  {this.getClaseDisponibile().map((clasa, index) => {
                    return (
                      <option id={clasa.id}>
                        {clasa.numar} {clasa.serie}
                      </option>
                    );
                  })}
                </Form.Control>
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

export default AddRepartizareModal;
