import React from "react";
import { Form, Button, Modal } from "react-bootstrap";
class EditDisciplineModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      denumire: "",
    };
  }

  componentDidMount() {
    this.setState({ denumire: this.props.disciplina.denumire });
  }

  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={() => this.props.onHide("discipline")}
      >
        <Modal.Header closeButton>
          <Modal.Title>Gestioneaza diciplinele</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Denumire</Form.Label>
            <Form.Control
              value={this.state.denumire}
              placeholder="Denumire"
              onChange={(e) => {
                this.setState({ denumire: e.target.value });
              }}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              this.props.onUpdate(this.state.denumire);
              this.props.onHide();
            }}
          >
            OK
          </Button>
          <Button variant="secondary" onClick={() => this.props.onHide()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default EditDisciplineModal;
