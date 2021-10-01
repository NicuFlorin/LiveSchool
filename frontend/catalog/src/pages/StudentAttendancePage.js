import React from "react";
import { Form, Table } from "react-bootstrap";
import Attendance from "../data/Attendance";
import Login from "../data/login";

class StudentAttendancePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attendance: [],
      currentDate: "",
      id_user: "",
    };
  }

  getCookie = (name) => {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
      begin = dc.indexOf(prefix);
      if (begin != 0) return null;
    } else {
      begin += 2;
    }
    var end = document.cookie.indexOf(";", begin);
    if (end == -1) {
      end = dc.length;
    }
    return unescape(dc.substring(begin + prefix.length, end));
  };

  getCurrentDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    return yyyy + "-" + mm + "-" + dd;
  };

  async componentDidMount() {
    debugger;
    const userRes = await Login.getCurrentLoggedIn();
    if (!userRes.ok) {
      this.setState({ loading: false, error: "Login: " + userRes.message });
      return;
    }

    let currentDate = this.props.match
      ? this.props.match.params.date
      : this.getCurrentDate();
    if (!currentDate) {
      currentDate = this.getCurrentDate();
    }
    let tip_utilizator = this.getCookie("tip_utilizator");
    if (tip_utilizator == "Parinte" || tip_utilizator == "Administrator") {
      userRes.user.id = localStorage.getItem("id_user");
    }

    debugger;

    let attendanceRes = await Attendance.getByStudentAndDate(
      currentDate,
      userRes.user.id
    );
    if (attendanceRes.ok) {
      this.setState({
        id_user: userRes.user.id,
        currentDate: currentDate,
        attendance: attendanceRes.attendance,
      });
    }
  }

  handleChange = async (e) => {
    debugger;
    let date = e.target.value;
    let attendanceRes = await Attendance.getByStudentAndDate(
      date,
      this.state.id_user
    );
    if (attendanceRes.ok) {
      this.setState({
        currentDate: date,
        attendance: attendanceRes.attendance,
      });
    }
  };

  render() {
    return (
      <div>
        <Form.Control
          type="date"
          value={this.state.currentDate}
          onChange={this.handleChange}
        />
        <Table>
          <thead>
            <tr>
              <th>Disciplina</th>
              <th>Tip participare</th>
              <th>Comentariu</th>
            </tr>
          </thead>
          <tbody>
            {this.state.attendance.map((attendance) => {
              return (
                <tr>
                  <td>{attendance.disciplina}</td>
                  <td>{attendance.tip_participare}</td>
                  <td>{attendance.comentariu}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default StudentAttendancePage;
