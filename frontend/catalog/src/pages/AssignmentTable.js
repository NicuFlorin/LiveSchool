import React from "react";
import { Form, Button, Table } from "react-bootstrap";
import Grade from "../data/Grade";
import DeleteIcon from "@material-ui/icons/Delete";
import { firebaseApp } from "../firebaseConfig";

class AssignmentTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      grades: [],
      changes: [],
      teacherFile: "",
    };
  }

  getNota = (id_elev) => {
    for (let i = 0; i < this.state.grades.length; i++) {
      if (this.state.grades[i].id_elev == id_elev) {
        return this.state.grades[i].nota;
      }
    }
    return "";
  };

  getFeedback = (id_elev) => {
    for (let i = 0; i < this.state.grades.length; i++) {
      if (this.state.grades[i].id_elev == id_elev) {
        return this.state.grades[i].feedback;
      }
    }
    return "";
  };
  getCurrentDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    return yyyy + "-" + mm + "-" + dd;
  };

  submitGrades = async () => {
    this.state.grades.forEach(async (grade) => {
      let gasit = false;
      this.state.initialValues.forEach(async (initialGrade) => {
        if (
          grade.id == initialGrade.id &&
          (grade.nota != initialGrade.nota ||
            grade.feedback != initialGrade.feedback)
        ) {
          await Grade.update(grade);
          gasit = true;
        } else if (grade.id == initialGrade.id) {
          gasit = true;
        }
      });
      if (!gasit) {
        await Grade.add(grade);
      }
    });
    let aux = JSON.parse(JSON.stringify(this.state.grades));
    this.setState({ initialValues: aux });
  };

  getFiles = async (id_user) => {
    try {
      const firebaseRef = firebaseApp
        .storage()
        .ref("/answears/" + id_user + "/" + this.props.id_evaluare);

      let files = await firebaseRef.listAll();
      if (files.items.length > 0) {
        let aux = this.state.files;
        let url = await files.items[0].getDownloadURL();

        let file_name = files.items[0].name;

        aux.push({ file_name: file_name, url: url, id_utilizator: id_user });

        this.setState({ files: aux });
      }
    } catch (err) {
      console.log(err);
    }
  };

  async componentDidMount() {
    let gradeRes = await Grade.getByAssignment(this.props.id_evaluare);
    if (gradeRes.ok) {
      let initialValues = JSON.parse(JSON.stringify(gradeRes.grades));
      this.setState({ grades: gradeRes.grades, initialValues: initialValues });

      for (let i = 0; i < this.props.elevi.length; i++) {
        await this.getFiles(this.props.elevi[i].id_utilizator);
      }
    }
  }

  handleChange = (e, id_elev) => {
    let aux = this.state.grades;
    let index = -1;
    aux.forEach((grade, i) => {
      if (grade.id_elev == id_elev) {
        index = i;
      }
    });
    if (index == -1) {
      aux.push({
        id_evaluare: this.props.id_evaluare,
        nota: e.target.name == "nota" ? e.target.value : "",
        data_creare: this.getCurrentDate(),
        id_elev: id_elev,
        feedback: e.target.name == "feedback" ? e.target.value : "",
      });
    } else {
      if (aux[index][e.target.name] != e.target.value)
        aux[index][e.target.name] = e.target.value;
    }
    this.setState({ grades: aux });
  };

  render() {
    let elevi = this.props.elevi;

    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>Elev</th>
              <th>Nota</th>
              <th>Rezolvare</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {elevi.map((elev) => {
              return (
                <tr>
                  <td>
                    {elev.nume} {elev.prenume}
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      name="nota"
                      onChange={(e) => this.handleChange(e, elev.id_elev)}
                      value={this.getNota(elev.id_elev)}
                    />
                  </td>
                  <td>
                    {this.state.files.map((file) => {
                      if (elev.id_utilizator == file.id_utilizator)
                        return <a href={file.url}>{file.file_name}</a>;
                    })}
                  </td>
                  <td>
                    <Form.Control
                      as="textarea"
                      name="feedback"
                      onChange={(e) => this.handleChange(e, elev.id_elev)}
                      value={this.getFeedback(elev.id_elev)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Form.Group>
          <Button variant="primary" onClick={this.submitGrades}>
            Salveaza
          </Button>
        </Form.Group>
      </div>
    );
  }
}

export default AssignmentTable;
