import React from "react";
import AddUserModal from "../components/AddUserModal";
import Login from "../data/login";
import Teacher from "../data/Teacher";
import Sidebar from "./Sidebar";
import { EventEmitter } from "fbemitter";
import UserForm from "../components/UserForm";
import RepartizareSidebar from "./RepartizareSidebar";
import Repartizare from "../data/Repartizare";
import Clase from "../data/Classes";
import Courses from "../data/Courses";
import AddRepartizareModal from "../components/AddRepartizareModal";
class TeachersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profesori: [],
      showModal: false,
      loading: false,
      error: null,
      id_admin: "",
      id_scoala: "",
      infoTeacherSelected: "",
      showModalRepartizare: "",
      repartizare: [],
    };
    this.emitter = new EventEmitter();
    this.discipline = [];
    this.clase = [];
  }

  getRepartizare = async (id_profesor) => {
    let repartizariRes = await Repartizare.getByTeacher(
      this.state.id_scoala,
      id_profesor
    );
    if (repartizariRes.ok) {
      this.setState({ repartizare: repartizariRes.repartizari });
    }
  };

  selectTeacher = async (teacher) => {
    await this.getRepartizare(teacher.id);
    this.setState({ infoTeacherSelected: teacher });
  };

  showModalRepartizare = () => {
    this.setState({ showModalRepartizare: true });
  };

  closeModalRepartizare = () => {
    this.setState({ showModalRepartizare: false });
  };

  showModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  async componentDidMount() {
    const userRes = await Login.getCurrentLoggedIn();
    if (!userRes.ok) {
      this.setState({ loading: false, error: "Login: " + userRes.message });
      return;
    }

    this.discipline = await Courses.getBySchool(userRes.user.id_scoala);
    debugger;
    this.clase = await Clase.getBySchoolYear();

    let profesoriRes = await Teacher.getTeachersBySchool(
      userRes.user.id_scoala
    );
    if (profesoriRes.ok) {
      this.setState({
        profesori: profesoriRes.profesori,
        error: null,
        loading: false,
        id_admin: userRes.user.id,
        id_scoala: userRes.user.id_scoala,
      });
    }
  }

  profesoriUpdate = () => {
    this.forceUpdate();
  };

  addTeacher = async (teacher) => {
    teacher.id_scoala = this.state.id_scoala;
    let teacherRes = await Teacher.addTeacher(teacher, this.state.id_admin);
    if (teacherRes.ok) {
      let profesoriRes = await Teacher.getTeachersBySchool(
        this.state.id_scoala
      );
      this.setState({ profesori: profesoriRes.profesori });
    }
    this.closeModal();
  };

  update = async (teacher) => {};
  delete = async (teacher) => {};

  addRepartizare = async (repartizare) => {
    repartizare.id_profesor = this.state.infoTeacherSelected.id;
    repartizare.id_an_scolar = localStorage.getItem("id_an_scolar");
    let repartizareRes = await Repartizare.add(repartizare);
    if (repartizareRes.ok) {
      await this.getRepartizare(this.state.infoTeacherSelected.id);
    }
  };

  render() {
    return (
      <div>
        <Sidebar
          item={this.state.profesori}
          onAdd={this.showModal}
          onSelectItem={this.selectTeacher}
          dataName="Profesor"
        ></Sidebar>
        <AddUserModal
          show={this.state.showModal}
          onHide={this.closeModal}
          addUser={this.addTeacher}
          tip_utilizator="Profesor"
        />
        {this.state.infoTeacherSelected !== "" && (
          <div style={{ marginRight: "auto" }}>
            <div style={{ marginLeft: "210px", marginRight: "210px" }}>
              <h4>
                {this.state.infoTeacherSelected.nume}{" "}
                {this.state.infoTeacherSelected.prenume}
              </h4>
              <a
                href="#"
                onClick={() =>
                  this.props.history.push(
                    "/admin/vizitareCatalogProfesor/" +
                      this.state.infoTeacherSelected.id
                  )
                }
              >
                Vizualizeaza catalog
              </a>
              <UserForm
                key={this.state.infoTeacherSelected.id}
                user={this.state.infoTeacherSelected}
                onUpdate={this.update}
                onDelete={this.delete}
              />
            </div>
            <div style={{ float: "right" }}>
              <RepartizareSidebar
                repartizare={this.state.repartizare}
                clase={this.clase.clase}
                discipline={this.discipline.discipline}
                showModalRepartizare={this.showModalRepartizare}
                tip_utilizator="Administrator"
              />
            </div>
            <AddRepartizareModal
              clase={this.clase.clase}
              discipline={this.discipline.discipline}
              repartizare={this.state.repartizare}
              show={this.state.showModalRepartizare}
              onHide={this.closeModalRepartizare}
              onAddRepartizare={this.addRepartizare}
              id_profesor={this.state.infoTeacherSelected.id}
            />
          </div>
        )}
      </div>
    );
  }
}

export default TeachersPage;
