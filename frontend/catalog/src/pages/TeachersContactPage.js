import React from "react";
import { Card } from "react-bootstrap";
import Teacher from "../data/Teacher";
import Login from "../data/login";
class TeachersContactPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profesori: [],
    };
  }

  componentDidMount = async () => {
    const userRes = await Login.getCurrentLoggedIn();
    if (!userRes.ok) {
      this.setState({ loading: false, error: "Login: " + userRes.message });
      return;
    }

    let teacherRes = await Teacher.getTeachersBySchool(userRes.user.id_scoala);
    if (teacherRes.ok) this.setState({ profesori: teacherRes.profesori });
  };

  render() {
    return (
      <div style={{ display: "flex" }}>
        {this.state.profesori.map((profesor, index) => {
          return (
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>
                  {profesor.nume} {profesor.prenume}
                </Card.Title>
                <Card.Text>
                  Email: {profesor.email} <br></br>
                  Telefon: {profesor.telefon}
                </Card.Text>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    );
  }
}

export default TeachersContactPage;
