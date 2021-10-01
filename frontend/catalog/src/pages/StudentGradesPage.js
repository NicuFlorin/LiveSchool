import React from "react";
import Courses from "../data/Courses";
import Clase from "../data/Classes";
import Grade from "../data/Grade";
import StudentGrades from "../components/StudentGrades";
import Login from "../data/login";
import DisciplineSidebar from "../components/DisciplineSidebar";
class StudentGradesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id_user: "",
      discipline: [],
      grades: [],
      id_clasa: "",
      selectedDiscipline: "",
    };
  }

  async componentDidMount() {
    const userRes = await Login.getCurrentLoggedIn();
    if (!userRes.ok) {
      this.setState({ loading: false, error: "Login: " + userRes.message });
      return;
    }
    let classRes = await Clase.getByStudent(userRes.user.id);
    if (classRes.ok) {
      let disciplineRes = await Courses.getByClass(classRes.clasa.id);
      if (disciplineRes.ok) {
        this.setState({
          discipline: disciplineRes.discipline,
          id_user: userRes.user.id,
          clasa: classRes.clasa,
        });
      }
    }
  }
  select = async (disciplina) => {
    let gradeRes = await Grade.getByDiscipline(disciplina.id_repartizare);
    if (gradeRes.ok) {
      this.setState({
        grades: gradeRes.grades,
        selectedDiscipline: disciplina,
      });
    }
  };
  render() {
    return (
      <div>
        <DisciplineSidebar
          discipline={this.state.discipline}
          onSelect={this.select}
        />
        {this.state.selectedDiscipline !== "" && (
          <div style={{ marginLeft: "210px" }}>
            <StudentGrades
              grades={this.state.grades}
              id_elev={this.state.id_user}
              key={this.state.selectedDiscipline.id}
            />
          </div>
        )}
      </div>
    );
  }
}

export default StudentGradesPage;
