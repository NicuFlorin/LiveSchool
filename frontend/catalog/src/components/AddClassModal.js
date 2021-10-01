import React from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";

class AddClassModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numar: "",
      serie: "",
    };
  }

  isUnique = () => {
    for (let i = 0; i < this.props.clase.length; i++) {
      if (
        this.props.clase[i].numar == this.state.numar &&
        this.props.clase[i].serie == this.state.serie
      ) {
        return false;
      }
    }
    return true;
  };

  submit = () => {
    if (!this.isUnique()) {
      alert("exista o clasa cu numele asta");
      return;
    }
    if (
      parseInt(this.state.numar) >= 0 &&
      parseInt(this.state.numar) <= 12 &&
      this.state.serie.length < 4
    ) {
      this.props.addClass(this.state);
      this.props.onHide();
    } else alert("Clasa invalida");
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Adauga Clasa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Form.Group as={Col}>
                <Form.Label>Numar(*)</Form.Label>
                <Form.Control
                  name="numar"
                  as="select"
                  onChange={this.handleChange}
                >
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((index) => {
                    return <option>{index}</option>;
                  })}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Serie(*)</Form.Label>
                <Form.Control
                  name="serie"
                  placeholder="Serie"
                  onChange={this.handleChange}
                ></Form.Control>
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

export default AddClassModal;
