import React from "react";
import Login from "../data/login";
import RepartizareSidebar from "./RepartizareSidebar";
import Repartizare from "../data/Repartizare";
import GradesTable from "../components/GradesTable";
import Semestre from "../data/Semestre";
import { Form } from "react-bootstrap";
import * as RiIcons from "react-icons/ri";

class GradesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id_profesor: "",
      repartizare: [],
      selectedClass: "",
      currentSemestre: "",
      semestre: [],
    };
  }

  getCurrentDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    return yyyy + "-" + mm + "-" + dd;
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

  getCurrentSemestre = (currentDate, semestre) => {
    let currentSemestre = "";
    semestre.map((semestru) => {
      if (
        semestru.data_inceput <= currentDate &&
        semestru.data_sfarsit >= currentDate
      ) {
        currentSemestre = semestru;
      }
    });
    currentSemestre = currentSemestre == "" ? semestre[0] : currentSemestre;
    return currentSemestre.id;
  };

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

  componentDidMount = async () => {
    const userRes = await Login.getCurrentLoggedIn();
    if (!userRes.ok) {
      this.setState({ loading: false, error: "Login: " + userRes.message });
      return;
    }
    if (this.getCookie("tip_utilizator") == "Administrator") {
      userRes.user.id = this.props.match.params.id_profesor;
    }
    let repartizare = await this.getRepartizare(
      userRes.user.id,
      userRes.user.id_scoala
    );

    let semestreRes = await Semestre.getBySchoolYear();
    if (semestreRes.ok && semestreRes.ok && repartizare) {
      let currentDate = this.getCurrentDate();
      let currentSemestre = this.getCurrentSemestre(
        currentDate,
        semestreRes.semestre
      );
      this.setState({
        id_profesor: userRes.user.id,
        repartizare: repartizare,
        currentSemestre: currentSemestre,
        semestre: semestreRes.semestre,
      });
    }
  };

  selectClass = (clasa) => {
    this.setState({ selectedClass: clasa });
  };

  handleChange = (event) => {
    const index = event.target.selectedIndex;
    const optionElement = event.target.childNodes[index];
    const optionElementId = optionElement.getAttribute("id");
    this.setState({ currentSemestre: optionElementId });
  };

  render() {
    return (
      <div>
        <RepartizareSidebar
          tip_utilizator="Profesor"
          repartizare={this.state.repartizare}
          onSelectClass={this.selectClass}
        />
        {this.state.selectedClass !== "" && (
          <div style={{ marginRight: "210px" }}>
            <Form.Group>
              <Form.Label>Alege semestrul</Form.Label>
              <Form.Control
                type="date"
                as="select"
                value={this.state.currentSemestre}
                onChange={this.handleChange}
                style={{ width: "15em" }}
              >
                {this.state.semestre.map((semestru) => {
                  return (
                    <option id={semestru.id} value={semestru.id}>
                      {semestru.nume}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
            <GradesTable
              id_semestru={this.state.currentSemestre}
              id_repartizare={this.state.selectedClass.id_repartizare}
              id_clasa={this.state.selectedClass.id_clasa}
              key={this.state.selectedClass.id_clasa}
              clasa={this.state.selectedClass}
            />
          </div>
        )}
      </div>
    );
  }
}
export default GradesPage;
