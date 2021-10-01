import React from "react";
import { Form } from "react-bootstrap";
import Login from "../data/login";
import Clase from "../data/Classes";
import SelectClass from "../components/SelectClass";
import Student from "../data/Student";
import AdminAttendanceSummary from "../components/AdminAttendanceSummary";
class AdminAttendance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clase: [],
      elevi: [],
      currentDate: "",
      id_clasa: "",
      showModal: false,
    };
  }

  getCurrentDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    return yyyy + "-" + mm + "-" + dd;
  };

  componentDidMount = async () => {
    const userRes = await Login.getCurrentLoggedIn();
    if (!userRes.ok) {
      this.setState({ loading: false, error: "Login: " + userRes.message });
      return;
    }

    let currentDate = this.getCurrentDate();

    let claseRes = await Clase.getBySchoolYear();
    if (claseRes.ok) {
      this.setState({ clase: claseRes.clase, currentDate: currentDate });
    }
  };

  handleChange = async (e) => {
    let date = e.target.value;
    let studentRes = await Student.getWithAttendance(this.state.id_clasa, date);
    this.setState({ currentDate: date, elevi: studentRes.elevi });
  };

  selectClass = async (id_clasa) => {
    debugger;
    let studentRes = await Student.getWithAttendance(
      id_clasa,
      this.state.currentDate
    );
    if (studentRes.ok) {
      this.setState({ elevi: studentRes.elevi, id_clasa: id_clasa });
    }
  };
  showModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <div>
        <Form.Group>
          <Form.Control
            type="date"
            name="date"
            value={this.state.currentDate}
            onChange={this.handleChange}
          />
          <SelectClass
            onSelectClass={this.selectClass}
            clase={this.state.clase}
          />
        </Form.Group>

        {this.state.id_clasa !== "" && (
          <div>
            <AdminAttendanceSummary
              elevi={this.state.elevi}
              key={this.state.id_clasa + this.state.currentDate}
              currentDate={this.state.currentDate}
            />
          </div>
        )}
        {/* <AdminRaportAttendanceModal
          onHide={this.closeModal}
          show={this.state.showModal}
          clase={this.state.clase}
          
        /> */}
      </div>
    );
  }
}

export default AdminAttendance;
