import React from "react";
import Sidebar from "./Sidebar";
import Login from "../data/login";
import Clase from "../data/Classes";
import AddClassModal from "../components/AddClassModal";
import ClassForm from "../components/ClassForm";
class ClassPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clase: [],
      error: null,
      loading: false,
      id_admin: "",
      id_scoala: "",
      showModal: false,
      selectedClass: "",
    };
  }

  showModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  addClass = async (clasa) => {
    await Clase.addClass(clasa);
    let claseRes = await Clase.getBySchoolYear();
    this.setState({ clase: claseRes.clase });
  };

  componentDidMount = async () => {
    const userRes = await Login.getCurrentLoggedIn();
    if (!userRes.ok) {
      this.setState({ loading: false, error: "Login: " + userRes.message });
      return;
    }

    let claseRes = await Clase.getBySchoolYear();
    if (claseRes.ok) {
      this.setState({
        clase: claseRes.clase,
        error: null,
        loading: false,
        id_admin: userRes.user.id,
        id_scoala: userRes.user.id_scoala,
      });
    }
  };

  update = async (clasa) => {
    for (let i = 0; i < this.state.clase.length; i++) {
      if (
        this.state.clase[i].numar == clasa.numar &&
        this.state.clase[i].serie == clasa.serie
      ) {
        alert("actualizare invalida");
        return;
      }
    }
    // de facut
  };

  selectClass = (clasa) => {
    this.setState({ selectedClass: clasa });
  };

  delete = async () => {
    // de facut
  };

  render() {
    return (
      <div>
        <Sidebar
          item={this.state.clase}
          onAdd={this.showModal}
          onSelectItem={this.selectClass}
          dataName="Clasa"
        />
        {this.state.selectClass != "" && (
          <div style={{ marginLeft: "210px" }}>
            <ClassForm
              key={this.state.selectedClass.id}
              selectedClass={this.state.selectedClass}
              onUpdate={this.update}
              onDelete={this.delete}
            />
          </div>
        )}

        <AddClassModal
          show={this.state.showModal}
          onHide={this.closeModal}
          addClass={this.addClass}
          clase={this.state.clase}
        />
      </div>
    );
  }
}

export default ClassPage;
