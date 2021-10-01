import React from "react";
import { Table, Button, Form } from "react-bootstrap";
import Student from "../data/Student";
import Attendance from "../data/Attendance";

class AttendanceTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialAttendance: [],
      attendance: [],
      elevi: [],
      changes: [],
    };
  }

  async componentDidMount() {
    let attendanceRes = await Attendance.getByDate(
      this.props.currentDate,
      this.props.id_repartizare
    );
    if (!attendanceRes.ok) {
      return;
    }
    let initialAttendance = JSON.parse(
      JSON.stringify(attendanceRes.attendance)
    );
    let studentRes = await Student.getByClass(this.props.id_clasa);
    if (attendanceRes.ok && studentRes.ok) {
      this.setState({
        initialAttendance: initialAttendance,
        attendance: attendanceRes.attendance,
        elevi: studentRes.elevi,
      });
    }
  }

  updateChanges = (change) => {
    let gasit = false;
    let index;
    this.state.changes.map((changeElem, i) => {
      if (
        change.id_elev == changeElem.id_elev &&
        (change.tip_participare !== changeElem.tip_participare ||
          change.comentariu !== changeElem.comentariu)
      ) {
        gasit = true;
        index = i;
      }
    });
    if (gasit) {
      let aux = this.state.changes;
      aux[index] = change;
      this.setState({ changes: aux });
    } else {
      let aux = this.state.changes;
      aux.push(change);
      this.setState({ changes: aux });
    }
  };

  updateState = (change) => {
    let gasit = false;
    let index;
    this.state.attendance.map((attendance, i) => {
      if (
        attendance.id_elev == change.id_elev &&
        (attendance.tip_participare !== change.tip_participare ||
          attendance.comentariu !== change.comentariu)
      ) {
        gasit = true;
        index = i;
      }
    });
    if (gasit) {
      let aux = this.state.attendance;
      aux[index] = change;
      this.setState({ attendance: aux });
    } else {
      let aux = this.state.attendance;
      aux.push(change);
      this.setState({ attendance: aux });
    }
  };

  // handleBlur = (e, attendance) => {
  //   let change = attendance;
  //   change.comentariu = e.target.value;
  //   this.updateChanges(change);
  // };

  handleChange = (e, attendance) => {
    let tip_participare = e.target.value;
    let change = JSON.parse(JSON.stringify(attendance));

    change.tip_participare = tip_participare;
    this.updateChanges(change);
    this.updateState(change);
  };

  changeComentariu = (e, attendance) => {
    let text = e.target.value;
    let change = JSON.parse(JSON.stringify(attendance));
    change.comentariu = text;
    this.updateChanges(change);
    this.updateState(change);
  };

  save = async (e) => {
    e.preventDefault();
    debugger;
    for (let i = 0; i < this.state.changes.length; i++) {
      let gasit = false;
      for (let j = 0; j < this.state.initialAttendance.length; j++) {
        if (this.state.changes[i].id === this.state.initialAttendance[j].id) {
          gasit = true;
          await Attendance.update(this.state.changes[i]);
          break;
        }
      }
      if (!gasit) {
        let aux = this.state.changes[i];
        aux.data_participare = this.props.currentDate;
        await Attendance.add(aux);
      }
    }
    let aux = JSON.parse(JSON.stringify(this.state.attendance));
    this.setState({ initialAttendance: aux, changes: [] });
  };

  renunta = () => {
    let aux = JSON.parse(JSON.stringify(this.state.initialAttendance));
    this.setState({ attendance: aux, changes: [] });
  };

  getAttendance = (id_elev) => {
    let result;

    this.state.attendance.map((attendance) => {
      if (attendance.id_elev == id_elev) {
        result = attendance;
      }
    });
    if (result) {
      return result;
    } else
      return {
        id_elev: id_elev,
        tip_participare: "",
        comentariu: "",
        id_repartizare: this.props.id_repartizare,
      };
  };

  render() {
    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>Elev</th>
              <th>Tip participare</th>
              <th>Comentariu</th>
            </tr>
          </thead>
          <tbody>
            {this.state.elevi.map((elev) => {
              let attendance = this.getAttendance(elev.id_elev);
              return (
                <tr>
                  <td>
                    {elev.nume} {elev.prenume}
                  </td>
                  <td>
                    <Form.Control
                      as="select"
                      value={attendance.tip_participare}
                      onChange={(e) => this.handleChange(e, attendance)}
                    >
                      <option selected hidden>
                        Alege
                      </option>
                      <option value="Prezent">Prezent</option>
                      <option value="Absent Nemotivat">Absent</option>
                      <option value="Absent Motivat">Absent Motivat</option>
                    </Form.Control>
                  </td>
                  <td>
                    <Form.Control
                      as="textarea"
                      rows="3"
                      value={attendance.comentariu}
                      onChange={(e) => this.changeComentariu(e, attendance)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Form.Group>
          <Button variant="primary" onClick={this.save}>
            Salveaza
          </Button>
          <Button variant="danger" onClick={this.renunta}>
            Renunta
          </Button>
        </Form.Group>
      </div>
    );
  }
}

export default AttendanceTable;
