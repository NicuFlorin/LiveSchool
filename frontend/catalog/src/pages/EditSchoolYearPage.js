import React from "react";
import { Card, Button, Form } from "react-bootstrap";
import SchoolYear from "../data/SchoolYear";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import Login from "../data/login";
import SchoolYearModal from "../components/SchoolYearModal";

class EditSchoolYearPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aniScolari: [],
      selectedYear: "",
      showModal: false,
      defaultValues: null,
    };
  }
  showModal = () => {
    this.setState({ showModal: true });
  };
  closeModal = () => {
    this.setState({ showModal: false });
  };
  async componentDidMount() {
    const userRes = await Login.getCurrentLoggedIn();
    if (!userRes.ok) {
      this.setState({ loading: false, error: "Login: " + userRes.message });
      return;
    }

    debugger;

    let aniScolariRes = await SchoolYear.getAllWithSemester(
      userRes.user.id_scoala
    );
    if (aniScolariRes.ok) {
      this.setState({
        aniScolari: aniScolariRes.aniScolari,
        id_scoala: userRes.user.id_scoala,
        id_user: userRes.user.id,
      });
    }
  }

  submit = async (anScolar, tip) => {
    debugger;
    if (tip == "add") {
      let anScolarRes = await SchoolYear.addYear(
        anScolar.data_inceput_semestrul1,
        anScolar.data_sfarsit_semestrul1,
        anScolar.data_inceput_semestrul2,
        anScolar.data_sfarsit_semestrul2,
        this.state.id_scoala,
        this.state.id_user
      );
      if (anScolarRes.ok) {
        let aniScolariRes = await SchoolYear.getAllWithSemester(
          this.state.id_scoala
        );
        this.setState({ aniScolari: aniScolariRes.aniScolari });
      }
    } else {
      let anScolarRes = await SchoolYear.update(
        anScolar.data_inceput_semestrul1,
        anScolar.data_sfarsit_semestrul1,
        anScolar.data_inceput_semestrul2,
        anScolar.data_sfarsit_semestrul2,

        this.state.defaultValues[0].id_an_scolar,
        this.state.defaultValues[0].id,
        this.state.defaultValues[1].id
      );
      if (anScolarRes.ok) {
        let aniScolariRes = await SchoolYear.getAllWithSemester(
          this.state.id_scoala
        );
        this.setState({
          aniScolari: aniScolariRes.aniScolari,

          defaultValues: null,
        });
      }
    }
  };

  edit = (anScolar) => {
    let defaultValues = [];
    defaultValues.push(anScolar.semestre[0]);
    defaultValues.push(anScolar.semestre[1]);
    this.setState({
      defaultValues: defaultValues,
      showModal: true,
      selectedYear: anScolar,
    });
  };

  render() {
    return (
      <div>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>
              Ani scolari <AddIcon onClick={this.showModal} />
            </Card.Title>

            {this.state.aniScolari.map((anScolar, index) => {
              return (
                <div>
                  <a
                    style={{ textDecoration: "none" }}
                    href="#"
                    onClick={() => this.setState({ selectedYear: anScolar })}
                  >
                    {anScolar.data_inceput} - {anScolar.data_sfarsit}
                  </a>
                  <EditIcon onClick={() => this.edit(anScolar)} />
                </div>
              );
            })}
          </Card.Body>
        </Card>
        {this.state.selectedYear !== "" && (
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Semestre</Card.Title>

              {this.state.selectedYear.semestre.map((semestru, index) => {
                return (
                  <div>
                    <a href="#" style={{ textDecoration: "none" }}>
                      {semestru.data_inceput} - {semestru.data_sfarsit}
                    </a>
                  </div>
                );
              })}
            </Card.Body>
          </Card>
        )}

        <SchoolYearModal
          show={this.state.showModal}
          onHide={this.closeModal}
          onSubmit={this.submit}
          defaultValues={this.state.defaultValues}
          key={this.state.selectedYear.id}
        />
      </div>
    );
  }
}

export default EditSchoolYearPage;
