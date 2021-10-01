import React from "react";
import { Form, Button, Col, Row, Modal } from "react-bootstrap";

class SchoolYearModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data_inceput_semestrul1: "",
      data_sfarsit_semestrul1: "",
      data_inceput_semestrul2: "",
      data_sfarsit_semestrul2: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submit = () => {
    if (!this.props.defaultValues) this.props.onSubmit(this.state, "add");
    else this.props.onSubmit(this.state, "update");
    this.props.onHide();
  };
  componentDidMount = () => {
    if (this.props.defaultValues) {
      this.setState({
        data_inceput_semestrul1: this.props.defaultValues[0].data_inceput,
        data_sfarsit_semestrul1: this.props.defaultValues[0].data_sfarsit,
        data_inceput_semestrul2: this.props.defaultValues[1].data_inceput,
        data_sfarsit_semestrul2: this.props.defaultValues[1].data_sfarsit,
      });
    }
  };

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Adauga Clasa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Form.Group as={Col}>
              <Form.Label>Data inceput semestrul 1</Form.Label>
              <Form.Control
                type="date"
                name="data_inceput_semestrul1"
                onChange={this.handleChange}
                placeholder="Data inceput semestrul 1"
                value={this.state.data_inceput_semestrul1}
                required
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Data sfarsit semestrul 1</Form.Label>
              <Form.Control
                type="date"
                name="data_sfarsit_semestrul1"
                onChange={this.handleChange}
                value={this.state.data_sfarsit_semestrul1}
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
                value={this.state.data_inceput_semestrul2}
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
                value={this.state.data_sfarsit_semestrul2}
                onChange={this.handleChange}
                placeholder="Data sfarsit semestrul 2"
                required
              />
            </Form.Group>
          </Row>
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

export default SchoolYearModal;
