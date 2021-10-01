import React from "react";
import UserForm from "../components/UserForm";
import Clase from "../data/Classes";
import Student from "../data/Student";
import AddUserModal from "../components/AddUserModal";
import Parent from "../data/Parent";
import Login from "../data/login";
import ParentsSidebar from "./ParentsSidebar";

class ParentsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elevi: [],
      parinti: [],
      elev: "",
      showModal: false,
      id_admin: "",
      selectedParent: "",
    };
  }

  async componentDidMount() {
    const userRes = await Login.getCurrentLoggedIn();
    if (!userRes.ok) {
      this.setState({ loading: false, error: "Login: " + userRes.message });
      return;
    }
    debugger;
    let studentRes = await Student.getStudentsWithParents();

    if (studentRes.ok) {
      this.setState({
        elevi: studentRes.elevi,
        id_admin: userRes.user.id,
        id_scoala: userRes.user.id_scoala,
      });
    }
  }

  showModal = (elev) => {
    this.setState({ showModal: true, elev: elev });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  selectClass = (clasa) => {
    this.setState({ selectedClass: clasa });
  };

  selectParent = (parent) => {
    this.setState({ selectedParent: parent });
  };
  update = async (parinte) => {};
  onDelete = async (id_parinte) => {};

  addUser = async (parinte) => {
    parinte.id_copil = this.state.elev.id;
    parinte.id_scoala = this.state.id_scoala;
    let parentRes = await Parent.add(parinte, this.state.id_admin);
    let studentRes = await Student.getStudentsWithParents();
    this.setState({ elevi: studentRes.elevi });
  };

  render() {
    return (
      <div>
        <ParentsSidebar
          elevi={this.state.elevi}
          onSelectParent={this.selectParent}
          onAdd={this.showModal}
        />
        {this.state.selectedParent !== "" && (
          <div style={{ marginLeft: "210px" }}>
            <UserForm
              key={this.state.selectedParent.id}
              user={this.state.selectedParent}
              onUpdate={this.update}
              onDelete={this.delete}
            />
          </div>
        )}
        {this.state.elev != "" && (
          <AddUserModal
            key={this.state.elev.id}
            tip_utilizator="Parinte"
            show={this.state.showModal}
            onHide={this.closeModal}
            addUser={this.addUser}
          />
        )}
      </div>
    );
  }
}

export default ParentsPage;
