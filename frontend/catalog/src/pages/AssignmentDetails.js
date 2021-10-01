import React from "react";
import AssignmentForm from "../components/AssignmentForm";
import Assignment from "../data/Assignment";
import Student from "../data/Student";
import Login from "../data/login";
import AssignmentTable from "./AssignmentTable";
import { firebaseApp } from "../firebaseConfig";
class AssignmentDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assignment: "",
      elevi: [],
      teacherFiles: "",
      id_profesor: "",
    };
  }

  getTeacherFile = async (id_profesor) => {
    try {
      const firebaseRef = firebaseApp
        .storage()
        .ref(
          "/assignments/" +
            id_profesor +
            "/" +
            this.props.match.params.id_evaluare
        );

      let files = await firebaseRef.listAll();
      if (files.items.length > 0) {
        let aux = this.state.files;
        let url = await files.items[0].getDownloadURL();

        let file_name = files.items[0].name;

        this.setState({ teacherFiles: { file_name: file_name, url: url } });
      }
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount = async () => {
    const userRes = await Login.getCurrentLoggedIn();
    if (!userRes.ok) {
      this.setState({ loading: false, error: "Login: " + userRes.message });
      return;
    }

    let assignmentRes = await Assignment.getById(
      this.props.match.params.id_evaluare
    );
    await this.getTeacherFile(userRes.user.id);
    if (assignmentRes.ok) {
      let studentRes = await Student.getByRepartizare(
        assignmentRes.assignment.id_repartizare
      );
      if (studentRes.ok) {
        this.setState({ elevi: studentRes.elevi });
      }
      this.setState({
        assignment: assignmentRes.assignment,
        id_profesor: userRes.user.id,
      });
    }
  };
  update = async (assignment) => {
    await this.getTeacherFile(this.state.id_profesor);
  };
  submit = async (assignment) => {
    debugger;
    assignment.id = this.props.match.params.id_evaluare;
    let assignmentRes = await Assignment.update(assignment);
    return null;
  };

  render() {
    return (
      <div>
        {this.state.assignment !== "" && (
          <div>
            <AssignmentForm
              defaultValues={this.state.assignment}
              tip="Actualizeaza"
              teacherFiles={this.state.teacherFiles}
              id_profesor={this.state.id_profesor}
              id_evaluare={this.state.assignment.id}
              onUpdate={this.update}
              onSubmit={this.submit}
              key={
                this.state.teacherFiles !== ""
                  ? this.state.teacherFiles.file_name
                  : ""
              }
            />
            <AssignmentTable
              elevi={this.state.elevi}
              id_evaluare={this.state.assignment.id}
              id_profesor={this.state.id_profesor}
            />
          </div>
        )}
      </div>
    );
  }
}

export default AssignmentDetails;
