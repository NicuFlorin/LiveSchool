import React from "react";
import { Form } from "react-bootstrap";
import Login from "../data/login";
import RepartizareSidebar from "./RepartizareSidebar";
import Repartizare from "../data/Repartizare";
import AttendanceTable from "../components/AttendanceTable";
import * as RiIcons from "react-icons/ri";
import { CSVLink } from "react-csv";
import Attendance from "../data/Attendance";
import Student from "../data/Student";

class AttendancePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedClass: "",
      currentDate: "",
      repartizare: [],
      id_user: "",
      csvData: "",
    };
  }

  getCurrentDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    return yyyy + "-" + mm + "-" + dd;
  };

  selectClass = async (clasa) => {
    let currentDate = this.getCurrentDate();
    let csvData = await this.exportCSV(clasa.id_clasa);

    this.setState({
      selectedClass: clasa,
      currentDate: currentDate,
      csvData: csvData,
    });
  };
  getRepartizare = async (id_profesor, id_scoala) => {
    let repartizariRes = await Repartizare.getByTeacher(id_scoala, id_profesor);
    if (repartizariRes.ok) {
      for (let i = 0; i < repartizariRes.repartizari.length; i++) {
        repartizariRes.repartizari[i].iconClosed = <RiIcons.RiArrowDownSFill />;
        repartizariRes.repartizari[i].iconOpened = <RiIcons.RiArrowUpSFill />;
      }
      return repartizariRes.repartizari;
    }
    return null;
  };

  async componentDidMount() {
    const userRes = await Login.getCurrentLoggedIn();
    if (!userRes.ok) {
      this.setState({ loading: false, error: "Login: " + userRes.message });
      return;
    }
    let repartizare = await this.getRepartizare(
      userRes.user.id,
      userRes.user.id_scoala
    );

    this.setState({ repartizare: repartizare });
  }

  handleChange = (e) => {
    this.setState({
      currentDate: e.target.value,
    });
  };

  exportCSV = async (id_clasa) => {
    debugger;
    let eleviRes = await Student.getByClass(id_clasa);
    let headers = [
      { label: "Elev", key: "elev" },
      { label: "Prezente", key: "prezente" },
      { label: "Absente Nemotivate", key: "absenteNemotivate" },
      { label: "Absente Motivate", key: "absenteMotivate" },
    ];
    let data = [];

    if (eleviRes.ok) {
      for (let i = 0; i < eleviRes.elevi.length; i++) {
        let attendanceRes = await Attendance.getAll(eleviRes.elevi[i].id_elev);
        data.push({
          elev: eleviRes.elevi[i].nume + " " + eleviRes.elevi[i].prenume,
          prezente: attendanceRes.attendance.prezente,
          absenteNemotivate: attendanceRes.attendance.absenteNemotivate,
          absenteMotivate: attendanceRes.attendance.absenteMotivate,
        });
      }
    }
    return {
      filename: `Raport participare clasa ${this.state.selectedClass.numar} ${this.state.selectedClass.serie}-${this.state.selectedClass.denumire}.csv`,
      headers: headers,
      data: data,
    };
  };

  render() {
    return (
      <div>
        <RepartizareSidebar
          tip_utilizator="Profesor"
          repartizare={this.state.repartizare}
          onSelectClass={this.selectClass}
        />
        <div>
          {this.state.selectedClass !== "" && (
            <div style={{ marginRight: "210px" }}>
              <Form.Control
                type="date"
                value={this.state.currentDate}
                name="date"
                onChange={this.handleChange}
              />
              <CSVLink {...this.state.csvData}>Exporta sumar CSV</CSVLink>
              <AttendanceTable
                key={this.state.selectedClass.id_clasa + this.state.currentDate}
                id_repartizare={this.state.selectedClass.id_repartizare}
                id_clasa={this.state.selectedClass.id_clasa}
                currentDate={this.state.currentDate}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default AttendancePage;
