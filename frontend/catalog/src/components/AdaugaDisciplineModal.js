import React from "react";
import { ListGroup, Card, Button, Form, Modal } from "react-bootstrap";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Courses from "../data/Courses";
import EditDisciplineModal from "./EditDisciplineModal";

class AdaugaDisciplineModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      denumire: "",
      search: "",
      selectedCourse: "",
      changed: false,
      discipline: [],
      showModal: false,
      indexCourse: "",
    };
    this.discipline = [];
  }

  showModal = (indexCourse) => {
    this.setState({ showModal: true, indexCourse: indexCourse });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  selectCourse = (disciplina) => {
    this.setState({
      selectedCourse: disciplina,
      denumire: disciplina.denumire,
    });
  };

  adauga = async () => {
    if (this.state.denumire.length > 3) {
      let disciplinaRes = await this.props.onAdd(this.state.denumire);
      if (disciplinaRes.ok) {
        this.discipline.push(disciplinaRes.disciplina);
        this.setState({ changed: !this.state.changed });
      }
    }
  };

  deleteCourse = async (id, index) => {
    debugger;
    let courseRes = await Courses.deleteCourse(id);
    if (courseRes.ok) {
      this.discipline.splice(index, 1);
      this.setState({ changed: !this.state.changed });
    }
  };

  componentDidMount() {
    this.setState({ discipline: this.props.discipline });
  }

  update = async (denumire) => {
    let courseRes = await Courses.update(
      this.discipline[this.state.indexCourse].id,
      {
        denumire: denumire,
      }
    );
    if (courseRes.ok) {
      this.discipline[this.state.indexCourse].denumire = denumire;
      this.setState({ changed: !this.state.changed });
    }
  };

  render() {
    if (this.discipline.length == 0) {
      this.discipline = this.props.discipline;
    }
    return (
      <div>
        <Modal
          show={this.props.show}
          onHide={() => this.props.onHide("discipline")}
        >
          <Modal.Header closeButton>
            <Modal.Title>Gestioneaza diciplinele</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Cauta</Form.Label>
                <Form.Control
                  name="search"
                  placeholder="Cauta"
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form>
            <Card style={{ width: "18rem" }}>
              <Card.Header>Discipline</Card.Header>
              <div style={{ overflowY: "scroll", height: "200px" }}>
                <ListGroup variant="flush">
                  {this.discipline.map((disciplina, index) => {
                    if (
                      disciplina.denumire
                        .toLowerCase()
                        .startsWith(this.state.search)
                    )
                      return (
                        <div>
                          <ListGroup.Item
                            key={index}
                            onClick={() => this.selectCourse(disciplina)}
                          >
                            {disciplina.denumire}

                            <DeleteIcon
                              style={{ right: "0", float: "right" }}
                              onClick={() =>
                                this.deleteCourse(disciplina.id, index)
                              }
                            />
                            <EditIcon
                              style={{ right: "0", float: "right" }}
                              onClick={() => this.showModal(index)}
                            />
                          </ListGroup.Item>
                        </div>
                      );
                  })}
                </ListGroup>
              </div>
              <Form>
                <Form.Group>
                  <Form.Label>Denumire</Form.Label>
                  <Form.Control
                    onChange={this.handleChange}
                    name="denumire"
                    value={this.state.denumire}
                    placeholder="Denumire"
                  />
                </Form.Group>
                <Button variant="primary" onClick={this.adauga}>
                  Adauga
                </Button>
              </Form>
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.props.onHide("discipline")}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        {this.discipline[this.state.indexCourse] && (
          <EditDisciplineModal
            show={this.state.showModal}
            onHide={this.closeModal}
            disciplina={this.discipline[this.state.indexCourse]}
            onUpdate={this.update}
          />
        )}
      </div>
    );
  }
}

export default AdaugaDisciplineModal;
