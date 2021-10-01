import React from "react";
import { Card, Modal, Button, ListGroup } from "react-bootstrap";
import Courses from "../data/Courses";
import Login from "../data/login";
import AdaugaDisciplineModal from "../components/AdaugaDisciplineModal";
import ConditiiPromovare from "../data/ConditiiPromovare";
import ConditiiPromovareModal from "../components/ConditiiPromovareModal";
import Clase from "../data/Classes";
import Student from "../data/Student";
import Grade from "../data/Grade";
import Attendace from "../data/Attendance";
import SchoolYear from "../data/SchoolYear";
import Corigenta from "../data/Corigenta";
import Repetent from "../data/Repetent";
import IstoricClase from "../data/IstoricClase";
import { withRouter } from "react-router-dom";
import IntervalClase from "../data/IntervalClase";
import IntervalClaseModal from "../components/IntervalClaseModal";
class Configurari extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: {
        discipline: false,
        ani_scolari: false,
        detalii_cont: false,
        conditii_promovare: false,
        interval_clase: false,
      },
      id_scoala: "",
      intervalClase: null,
      discipline: [],
    };
  }

  getDiscipline = async (id_scoala) => {
    let disciplineRes = await Courses.getBySchool(id_scoala);
    if (disciplineRes.ok) {
      return disciplineRes.discipline;
    }
    return null;
  };

  getConditii = async (id_scoala) => {
    let conditiiRes = await ConditiiPromovare.getBySchool(id_scoala);
    if (conditiiRes.ok) {
      return conditiiRes.conditii;
    }
    return null;
  };

  async componentDidMount() {
    const userRes = await Login.getCurrentLoggedIn();
    if (!userRes.ok) {
      this.setState({ loading: false, error: "Login: " + userRes.message });
      return;
    }
    let discipline = await this.getDiscipline(userRes.user.id_scoala);
    debugger;
    let intervalClase = await IntervalClase.get(userRes.user.id_scoala);
    let conditii_promovare = await this.getConditii(userRes.user.id_scoala);
    this.setState({
      id_scoala: userRes.user.id_scoala,
      discipline: discipline,
      conditii_promovare: conditii_promovare,
      intervalClase: intervalClase.interval,
    });
  }

  handleClick = (e) => {
    let aux = this.state.showModal;
    aux[e.target.id] = true;
    this.setState({ showModal: aux });
  };

  closeModal = (param) => {
    let aux = this.state.showModal;
    aux[param] = false;
    this.setState({ showModal: aux });
  };

  addDisciplina = async (denumire) => {
    let coursesRes = await Courses.addCourse({
      denumire: denumire,
      id_scoala: this.state.id_scoala,
    });
    return coursesRes;
  };

  salveazaConditii = async (conditii) => {
    if (this.state.conditii_promovare == null) {
      conditii.id_scoala = this.state.id_scoala;
      await ConditiiPromovare.add(conditii);
    } else {
      if (
        conditii.corigente_max != this.state.conditii_promovare.corigente_max ||
        conditii.absente_max != this.state.conditii_promovare.absente_max
      ) {
        conditii.id = this.state.conditii_promovare.id;
        await ConditiiPromovare.update(conditii);
      }
    }
  };

  getCorigente = (grades) => {
    for (let i = 0; grades.length; i++) {}
  };

  gestioneazaRepetenti = async (repetenti) => {
    for (let i = 0; i < repetenti.length; i++) {
      await Repetent.add(repetenti[i]);
    }
  };

  existaAnScolar = async () => {
    let anScolarRes = await SchoolYear.getAnScolarUrmator(this.state.id_scoala);
    if (anScolarRes.ok) {
      return { ok: true, id_an_scolar: anScolarRes.anScolar.id };
    }
    return { ok: false };
  };

  createClasses = async (clase) => {
    if (this.state.intervalClase && this.state.intervalClase !== "")
      for (let i = 0; i < clase.length; i++) {
        let claseRes = await Clase.add({
          numar: this.state.intervalClase.clasa_primara,
          serie: clase[i].serie,
          id_scoala: this.state.id_scoala,
        });
      }
  };

  promoveaza = async () => {
    let clase_primare = [];
    debugger;
    let nouAnScolar = await this.existaAnScolar();
    if (nouAnScolar.ok) {
      let repetenti = [];
      let claseRes = await Clase.getBySchoolYear();
      if (claseRes.ok) {
        for (let i = 0; i < claseRes.clase.length; i++) {
          let disciplineRes = await Courses.getByClass(claseRes.clase[i].id);
          if (disciplineRes.ok) {
            let studentRes = await Student.getByClass(claseRes.clase[i].id);
            if (studentRes.ok) {
              for (let j = 0; j < studentRes.elevi.length; j++) {
                let nr_corigente = 0;
                for (let k = 0; k < disciplineRes.discipline.length; k++) {
                  let gradeRes = await Grade.getMedieByStudentAndDiscipline(
                    studentRes.elevi[j].id_elev,
                    disciplineRes.discipline[k].id
                  );
                  if (gradeRes.medie < 5) {
                    debugger;
                    await Corigenta.add({
                      clasa: claseRes.clase[i].numar,
                      nota: gradeRes.medie,
                      id_elev: studentRes.elevi[j].id_elev,
                      id_disciplina: disciplineRes.discipline[k].id,
                      id_an_scolar: localStorage.getItem("id_an_scolar"),
                    });
                    nr_corigente++;
                  }
                }
                let attendance = await Attendace.getNrNemotivate(
                  studentRes.elevi[j].id_elev
                );

                if (
                  nr_corigente > this.state.conditii_promovare.corigente_max ||
                  attendance.numar > this.state.conditii_promovare.absente_max
                ) {
                  repetenti.push({
                    id_elev: studentRes.elevi[j].id_elev,
                    clasa: claseRes.clase[i].numar,
                    seria: claseRes.clase[i].serie,
                  });
                } else if (
                  nr_corigente > 0 &&
                  claseRes.clase[i].numar ==
                    this.state.intervalClase.clasa_terminala
                ) {
                  repetenti.push({
                    id_elev: studentRes.elevi[j].id_elev,
                    clasa: claseRes.clase[i].numar,
                    seria: claseRes.clase[i].serie,
                  });
                }
              }
            }
          }
          if (
            claseRes.clase[i].numar < this.state.intervalClase.clasa_terminala
          ) {
            await Clase.promote(claseRes.clase[i].id, nouAnScolar.id_an_scolar);
          } else {
            clase_primare.push({ serie: claseRes.clase[i].serie });
          }
          await IstoricClase.add({
            id: claseRes.clase[i].id,
            id_an_scolar: claseRes.clase[i].id_an_scolar,
            numar: claseRes.clase[i].numar,
            serie: claseRes.clase[i].serie,
          });
        }
      }
      if (repetenti.length > 0) {
        for (let i = 0; i < repetenti.length; i++)
          await Student.update(repetenti[i].id_elev, { serie: "RE" });
      }
      await this.createClasses(clase_primare);
    } else alert("nu exista an scolar");
  };

  submitInterval = async (interval, tip) => {
    if (tip == "update") {
      let intervalRes = await IntervalClase.update(
        this.state.id_scoala,
        interval
      );
      if (intervalRes.ok) {
        this.setState({ intervalClase: intervalRes.interval });
      }
    } else {
      interval.id_scoala = this.state.id_scoala;
      let intervalRes = await IntervalClase.add(interval);
      if (intervalRes.ok) {
        this.setState({ intervalClase: intervalRes.interval });
      }
    }
  };

  render() {
    return (
      <div>
        <div style={{ display: "flex" }}>
          <Card style={{ width: "18rem" }}>
            <Card.Header>General</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item id="discipline" onClick={this.handleClick}>
                Discipline
              </ListGroup.Item>

              <ListGroup.Item
                onClick={() => {
                  this.props.history.push("/admin/aniScolari");
                }}
              >
                Ani scolari
              </ListGroup.Item>
            </ListGroup>
          </Card>
          <Card style={{ width: "18rem" }}>
            <Card.Header>Promovare</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item
                id="conditii_promovare"
                onClick={this.handleClick}
              >
                Conditii de promovare
              </ListGroup.Item>
              <ListGroup.Item id="interval_clase" onClick={this.handleClick}>
                Interval Clase
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </div>
        <Button variant="primary" onClick={this.promoveaza}>
          Promoveaza elevi
        </Button>

        <AdaugaDisciplineModal
          show={this.state.showModal.discipline}
          onHide={this.closeModal}
          discipline={this.state.discipline}
          onAdd={this.addDisciplina}
        />
        <ConditiiPromovareModal
          show={this.state.showModal.conditii_promovare}
          onHide={this.closeModal}
          conditii_promovare={this.state.conditii_promovare}
          onSubmit={this.salveazaConditii}
          key={
            this.state.conditii_promovare ? this.state.conditii_promovare.id : 0
          }
        />
        <IntervalClaseModal
          show={this.state.showModal.interval_clase}
          onHide={this.closeModal}
          defaultValues={this.state.intervalClase}
          onSubmit={this.submitInterval}
          key={
            this.state.intervalClase !== null
              ? this.state.intervalClase.id
              : this.state.intervalClase
          }
        />
      </div>
    );
  }
}

export default withRouter(Configurari);
