import React from "react";
import Sidebar from "./Sidebar";
import StudentAttendancePage from "./StudentAttendancePage";
import Parent from "../data/Parent";
import Login from "../data/login";
class ParentAttendance extends React.Component {
  constructor(props) {
    super(props);
    this.state = { copil: "", copii: [] };
  }

  selectCopil = (copil) => {
    localStorage.setItem("id_user", copil.id_utilizator);
    this.setState({ copil: copil });
  };
  componentDidMount = async () => {
    const userRes = await Login.getCurrentLoggedIn();
    if (!userRes.ok) {
      this.setState({ loading: false, error: "Login: " + userRes.message });
      return;
    }

    let copiiRes = await Parent.getCopii(userRes.user.id);
    if (copiiRes.ok) {
      this.setState({ copii: copiiRes.copii });
    }
  };
  render() {
    return (
      <div>
        <Sidebar item={this.state.copii} onSelectItem={this.selectCopil} />
        <div style={{ marginLeft: "210px" }}>
          <StudentAttendancePage />
        </div>
      </div>
    );
  }
}

export default ParentAttendance;
