import React from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import AddFilesModal from "./AddFilesModal";
import DeleteIcon from "@material-ui/icons/Delete";
import BackupIcon from "@material-ui/icons/Backup";
import { firebaseApp } from "../firebaseConfig";
class AssignmentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nume: "",
      tip_evaluare: "",
      pondere: "",
      descriere: "",
      data_creare: "",
      termen_raspuns: "",
      fisier_atasat: false,
      showModal: false,
      id_evaluare: "",
      id_user: "",
    };
  }

  showModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };
  getCurrentDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    return yyyy + "-" + mm + "-" + dd;
  };

  submit = async (e) => {
    e.preventDefault();
    if (
      this.state.nume === "" ||
      this.state.tip_evaluare === "" ||
      this.state.pondere === ""
    ) {
      alert("evaluare invalida");
      return;
    }
    let assignment = this.state;
    assignment.data_create = this.getCurrentDate();
    let res = await this.props.onSubmit(assignment);
    if (res && this.state.fisier_atasat) {
      if (!this.props.defaultValues) {
        this.setState({
          nume: "",
          pondere: "",
          tip_evaluare: "",
          termen_raspuns: "",
          ora_deadline: "",
          descriere: "",
        });
      } else {
        this.props.onUpdate();
      }
      this.setState({ id_evaluare: res });
      this.showModal();
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCheck = (e) => {
    this.setState({ fisier_atasat: e.target.checked });
  };

  componentDidMount() {
    debugger;
    if (this.props.defaultValues) {
      let defaultValues = this.props.defaultValues;
      this.setState({
        nume: defaultValues.nume,
        pondere: defaultValues.pondere,
        tip_evaluare: defaultValues.tip_evaluare,
        termen_raspuns: defaultValues.termen_raspuns,
        ora_deadline: defaultValues.ora_deadline,
        descriere: defaultValues.descriere,
      });
    }
    this.setState({
      teacherFiles: this.props.teacherFiles ? this.props.teacherFiles : "",
      id_evaluare: this.props.id_evaluare ? this.props.id_evaluare : "",
      id_user: this.props.id_user ? this.props.id_user : this.props.id_profesor,
    });
  }

  deleteFile = async () => {
    try {
      debugger;
      const firebaseRef = firebaseApp
        .storage()
        .ref(
          "/assignments/" +
            this.props.id_profesor +
            "/" +
            this.props.id_evaluare
        );

      let files = await firebaseRef.listAll();
      if (files.items.length > 0) {
        await files.items[0].delete();
      }
      this.setState({ teacherFiles: "" });
    } catch (err) {
      console.log(err);
    }
  };

  update = () => {};

  render() {
    return (
      <div>
        <Form>
          <Row>
            <Form.Group as={Col}>
              <Form.Label>Nume evaluare</Form.Label>
              <Form.Control
                name="nume"
                placeholder="Nume"
                value={this.state.nume}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Tip evaluare</Form.Label>
              <Form.Control
                name="tip_evaluare"
                as="select"
                placeholder="Tip evaluare"
                value={this.state.tip_evaluare}
                onChange={this.handleChange}
              >
                <option selected hidden>
                  Alege tipul evaluarii
                </option>
                <option>Test</option>
                <option>Tema</option>
                <option>Teza</option>
                <option>Proiect</option>
              </Form.Control>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col}>
              <Form.Label>Pondere</Form.Label>
              <Form.Control
                name="pondere"
                type="number"
                placeholder="Pondere evaluare"
                value={this.state.pondere}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Termen de predare</Form.Label>
              <Form.Control
                name="termen_raspuns"
                type="date"
                placeholder="Termen raspuns"
                value={this.state.termen_raspuns}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Ora</Form.Label>
              <Form.Control
                name="ora_deadline"
                type="time"
                value={this.state.ora_deadline}
                onChange={this.handleChange}
              />
            </Form.Group>
          </Row>

          <Form.Row>
            {this.state.teacherFiles && this.state.teacherFiles !== "" ? (
              <div>
                <a href={this.state.teacherFiles.url}>
                  {this.state.teacherFiles.file_name}
                </a>
                <DeleteIcon onClick={this.deleteFile} />
              </div>
            ) : (
              <div>
                {this.props.defaultValues ? (
                  <div>
                    <Form.Label>Adauga fisier</Form.Label>
                    <BackupIcon onClick={this.showModal} />
                  </div>
                ) : (
                  <Form.Check
                    type="checkbox"
                    label="Atseaza fisiere"
                    name="fisier_atasat"
                    onChange={this.handleCheck}
                  />
                )}
              </div>
            )}
          </Form.Row>

          <Form.Row>
            <Form.Group>
              <Form.Label>Descriere</Form.Label>
              <CKEditor
                editor={ClassicEditor}
                data={
                  this.props.defaultValues
                    ? this.props.defaultValues.descriere
                    : ""
                }
                onChange={(e, editor) => {
                  this.setState({ descriere: editor.getData() });
                }}
              />
            </Form.Group>
          </Form.Row>
          <Form.Group>
            <Button variant="primary" onClick={this.submit}>
              {this.props.tip}
            </Button>
            <Button variant="danger" onClick={this.deteleFile}>
              Renunta
            </Button>
          </Form.Group>
        </Form>
        <AddFilesModal
          show={this.state.showModal}
          onHide={this.closeModal}
          id_user={this.state.id_user}
          id_evaluare={this.state.id_evaluare}
          tip="assignments"
          onUpdate={this.props.onUpdate}
          key={this.state.id_user}
        />
      </div>
    );
  }
}

export default AssignmentForm;
