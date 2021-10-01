import React from "react";
import { Form, Modal, Button } from "react-bootstrap";

class ConditiiPromovareModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      corigente_max: "",
      absente_max: "",
    };
  }

  componentDidMount() {
    if (this.props.conditii_promovare) {
      this.setState({
        corigente_max: this.props.conditii_promovare.corigente_max,
        absente_max: this.props.conditii_promovare.absente_max,
      });
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submit = () => {
    this.props.onSubmit(this.state);
    this.props.onHide("conditii_promovare");
  };

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Seteaza conditii de promovare pentru elevi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Numar maxim de discipline nepromovate</Form.Label>
              <Form.Control
                name="corigente_max"
                onChange={this.handleChange}
                placeholder="Nr. maxim corigente"
                value={this.state.corigente_max}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Numar maxim de absente</Form.Label>
              <Form.Control
                name="absente_max"
                onChange={this.handleChange}
                placeholder="Nr. maxim absente nemotivate"
                value={this.state.absente_max}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => this.props.onHide("conditii_promovare")}
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

export default ConditiiPromovareModal;
