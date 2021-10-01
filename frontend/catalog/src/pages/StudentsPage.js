import React from "react";
import Clase from "../data/Classes";
import { Form, Row, Col } from "react-bootstrap";
import SelectClass from "../components/SelectClass";
import Login from "../data/login";
import Student from "../data/Student";
import Sidebar from "./Sidebar";
import AddUserModal from "../components/AddUserModal";
import UserForm from "../components/UserForm";
class StudentsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elevi: [],
      infoStudentSelected: "",
      showModal: false,
      id_scoala: "",
      id_admin: "",
    };
    this.clase = [];
  }

  showModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  componentDidMount = async () => {
    const userRes = await Login.getCurrentLoggedIn();
    if (!userRes.ok) {
      this.setState({ loading: false, error: "Login: " + userRes.message });
      return;
    } else {
      let courseRes = await Clase.getBySchoolYear();
      if (!courseRes.ok) {
        return;
      }
      this.clase = courseRes.clase;
      let studentsRes = await Student.getBySchoolYear();
      if (studentsRes.ok) {
        this.setState({
          elevi: studentsRes.elevi,
          id_admin: userRes.user.id,
          id_scoala: userRes.user.id_scoala,
        });
      }
    }
  };

  addStudent = async (student) => {
    student.id_scoala = this.state.id_scoala;
    let studentRes = await Student.addStudent(student, this.state.id_admin);
    if (studentRes.ok) {
      let studentsRes = await Student.getBySchoolYear();
      if (studentsRes.ok) {
        this.setState({
          elevi: studentsRes.elevi,
          id_admin: this.state.id_admin,
          id_scoala: this.state.id_scoala,
        });
      }
    }
    this.closeModal();
  };

  selectClass = () => {};

  selectStudent = (student) => {
    this.setState({ infoStudentSelected: student });
  };

  update = () => {};
  delete = () => {};

  render() {
    console.log("esti prost");
    return (
      <div>
        <div>
          <select></select>
          <Sidebar
            item={this.state.elevi}
            onAdd={this.showModal}
            onSelectItem={this.selectStudent}
            clase={this.clase}
            dataName="Elev"
          ></Sidebar>
        </div>
        <AddUserModal
          show={this.state.showModal}
          onHide={this.closeModal}
          addUser={this.addStudent}
          tip_utilizator="Elev"
          clase={this.clase}
        />
        {this.state.infoStudentSelected !== "" && (
          <div style={{ marginLeft: "210px" }}>
            <div style={{ display: "flex" }}>
              <h4>
                {this.state.infoStudentSelected.nume}{" "}
                {this.state.infoStudentSelected.prenume}
              </h4>
              <div style={{ width: "150px", marginLeft: "3em" }}>
                <SelectClass
                  onSelectClass={this.selectClass}
                  clase={this.clase}
                  studentSelected={this.state.infoStudentSelected}
                  defaultValue={this.state.infoStudentSelected.id_clasa}
                  key={this.state.infoStudentSelected.id}
                />
              </div>
            </div>

            <UserForm
              key={this.state.infoStudentSelected.id}
              user={this.state.infoStudentSelected}
              onUpdate={this.update}
              onDelete={this.delete}
            />
          </div>
        )}
      </div>
    );
  }
}

export default StudentsPage;
