import React from "react";
import { Form, Button, Modal, Row, Col } from "react-bootstrap";

class IntervalClaseModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clasa_primara: "",
      clasa_terminala: "",
    };
  }

  componentDidMount() {
    if (this.props.defaultValues) {
      this.setState({
        clasa_primara: this.props.defaultValues.clasa_primara,
        clasa_terminala: this.props.defaultValues.clasa_terminala,
      });
    }
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submit = async () => {
    if (this.props.defaultValues) {
      this.props.onSubmit(this.state, "update");
    } else {
      this.props.onSubmit(this.state, "add");
    }
    this.props.onHide("interval_clase");
  };
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Seteaza interval clase</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Form.Group as={Col}>
                <Form.Label>Clasa primara(*)</Form.Label>
                <Form.Control
                  name="clasa_primara"
                  value={this.state.clasa_primara}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Clasa terminala(*)</Form.Label>
                <Form.Control
                  name="clasa_terminala"
                  placeholder="Clasa terminala"
                  value={this.state.clasa_terminala}
                  onChange={this.handleChange}
                ></Form.Control>
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => this.props.onHide("interval_clase")}
          >
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

export default IntervalClaseModal;
