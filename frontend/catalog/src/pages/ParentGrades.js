import React from "react";
import Student from "../data/Student";
import Login from "../data/login";
import ParentGradesSidebar from "./ParentGradesSidebar";
import StudentGrades from "../components/StudentGrades";
class ParentGrades extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copii: [],
      disciplina: "",
      id_elev: "",
    };
  }

  async componentDidMount() {
    const userRes = await Login.getCurrentLoggedIn();
    if (!userRes.ok) {
      this.setState({ loading: false, error: "Login: " + userRes.message });
      return;
    }

    let copiiRes = await Student.getByParent(userRes.user.id);
    if (copiiRes.ok) {
      this.setState({ copii: copiiRes.copii });
    }
  }

  selectDiscipline = (disciplina, id_elev, id_user) => {
    localStorage.setItem("id_user", id_user);
    this.setState({ disciplina: disciplina, id_elev: id_elev });
  };

  render() {
    return (
      <div>
        <ParentGradesSidebar
          copii={this.state.copii}
          onSelectDiscipline={this.selectDiscipline}
        />
        {this.state.disciplina !== "" && (
          <div style={{ marginLeft: "210px" }}>
            <StudentGrades
              grades={this.state.disciplina.note}
              id_elev={this.state.id_elev}
              key={this.state.disciplina.id}
            />
          </div>
        )}
      </div>
    );
  }
}

export default ParentGrades;
