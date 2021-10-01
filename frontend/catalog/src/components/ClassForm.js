import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

class ClassForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numar: "",
      serie: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    this.setState({
      numar: this.props.selectedClass.numar,
      serie: this.props.selectedClass.serie,
    });
  }

  submit = () => {
    if (this.state.numar == "" || this.state.serie == "") {
      alert("actualizare invalida");
      return;
    }
    this.props.onUpdate(this.state);
  };

  render() {
    return (
      <Form>
        <Row>
          <Form.Group as={Col}>
            <Form.Label>Numar</Form.Label>
            <Form.Control
              as="select"
              name="numar"
              value={this.state.numar}
              onChange={this.handleChange}
            >
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((index) => {
                return <option>{index}</option>;
              })}
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Serie</Form.Label>
            <Form.Control
              name="serie"
              placeholder="Serie"
              onChange={this.handleChange}
              value={this.state.serie}
            />
          </Form.Group>
        </Row>
        <Form.Group>
          <Button variant="primary" onClick={this.submit}>
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

export default ClassForm;
