import React from "react";
import { Button, Table, Form } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Student from "../data/Student";
import Assignment from "../data/Assignment";
import Grade from "../data/Grade";
import { CSVLink } from "react-csv";

class GradesTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialValues: [],
      evaluari: [],
      elevi: [],
      gradeCell: "",
      changes: [],
    };
  }

  async componentDidMount() {
    let assignmentRes = await Assignment.getAssignmentsWithGrades(
      this.props.id_repartizare,
      this.props.id_semestru
    );
    let studentRes = await Student.getByClass(this.props.id_clasa);

    if (assignmentRes.ok && studentRes.ok) {
      let evaluari = JSON.parse(JSON.stringify(assignmentRes.evaluari));
      this.setState({
        evaluari: evaluari,
        elevi: studentRes.elevi,
        initialValues: assignmentRes.evaluari,
      });
    }
  }

  getNota = (id_elev, evaluare) => {
    let note_elev = evaluare.note.filter((nota) => nota.id_elev == id_elev);
    if (note_elev.length > 0) return note_elev[0].nota;
    return "";
  };

  getMedie = (id_elev) => {
    let sumOfGrades = 0;
    let sumOfWeights = 0;
    this.state.evaluari.map((evaluare) => {
      let note_elev = evaluare.note.filter((nota) => nota.id_elev == id_elev);
      if (note_elev.length > 0 && note_elev[0].nota != "") {
        sumOfGrades +=
          parseInt(note_elev[0].nota) * parseFloat(evaluare.pondere);
        sumOfWeights += evaluare.pondere;
      }
    });
    if (sumOfWeights == 0) return "";

    return Math.round((sumOfGrades / sumOfWeights) * 100) / 100;
  };

  updateState = (change, evaluare) => {
    let aux = this.state.evaluari;
    let index;
    aux.map((evaluare, i) => {
      if (evaluare.id == change.id_evaluare) {
        index = i;
      }
    });
    if (index == undefined) {
      return;
    }
    let gasit = false;
    evaluare.note.map((nota) => {
      if (nota.id_elev == change.id_elev) {
        nota.nota = change.nota;
        gasit = true;
      }
    });
    if (!gasit) {
      evaluare.note.push({ nota: change.nota, id_elev: change.id_elev });
    }
    aux[index] = evaluare;

    this.setState({ evaluare: aux });
  };

  updateChanges = (change) => {
    let index = -1;
    this.state.changes.map((changeElem, i) => {
      if (
        changeElem.id_elev == change.id_elev &&
        changeElem.id_evaluare == change.id_evaluare
      ) {
        index = i;
      }
    });
    if (index >= 0) {
      let aux = this.state.changes;
      aux[index] = change;
      this.setState({ change: aux });
    } else {
      let aux = this.state.changes;
      aux.push(change);
      this.setState({ change: aux });
    }
  };

  save = async () => {
    this.state.changes.map((change) => {
      let evaluare = this.state.initialValues.filter(
        (evaluare) => evaluare.id == change.id_evaluare
      );
      change.id_semestru = this.props.id_semestru;

      if (evaluare.length > 0) {
        let index = -1;
        let note_elev = evaluare[0].note.map((nota, i) => {
          if (nota.id_elev == change.id_elev) {
            index = i;
            if (change.nota == "") {
              Grade.deleteGrade(change.id_elev, change.id_evaluare);
            } else if (nota.nota != change.nota) {
              Grade.update(change);
            }
          }
        });
        if (index == -1) {
          Grade.add(change);
        }
      }
    });

    let aux = JSON.parse(JSON.stringify(this.state.evaluari));
    this.setState({ initialValues: aux, changes: [] });
  };

  onBlur = (e, evaluare, id_elev) => {
    let td = e.target.parentElement;
    let orig_text = e.target.parentElement.getAttribute("data-text");

    let current_text = e.target.value;

    if (
      orig_text != current_text &&
      (current_text == "" ||
        (!isNaN(current_text) &&
          parseInt(current_text) > 0 &&
          parseInt(current_text) < 11))
    ) {
      td.removeAttribute("data-clicked");
      td.removeAttribute("data-text");
      let type;

      let change = {
        nota: current_text,
        id_evaluare: evaluare.id,
        id_elev: id_elev,
      };
      this.updateState(change, evaluare);
      this.updateChanges(change);

      td.innerHTML = current_text;
    } else {
      td.removeAttribute("data-clicked");
      td.removeAttribute("data-text");
      td.innerHTML = orig_text;
    }
  };

  editCell = (e, evaluare, id_elev) => {
    if (e.target.hasAttribute("data-clicked")) {
      return;
    }
    e.target.setAttribute("data-clicked", "yes");
    e.target.setAttribute("data-text", e.target.innerHTML);

    let input = document.createElement("input");
    input.setAttribute("type", "number");
    input.value = e.target.innerHTML;
    input.style.width = e.target.offsetWidth + "px";
    input.style.height = e.target.offsetHeight + "px";
    input.style.border = "0px";
    input.style.fontFamily = "inherit";
    input.style.fontSize = "inherit";
    input.style.textAlign = "inherit";
    input.style.backgroundColor = "LightGoldenRodYellow";
    input.onblur = (e) => this.onBlur(e, evaluare, id_elev);
    input.onkeypress = (e) => {
      if (e.keyCode == 13) {
        input.blur();
      }
    };

    e.target.innerHTML = "";
    e.target.style.cssText = "padding: 0px 0px";
    e.target.append(input);
    e.target.firstElementChild.select();
  };

  exportCSV = () => {
    let evaluari = this.state.initialValues;
    let elevi = this.state.elevi;
    let headers = [];
    let data = [];
    debugger;
    headers.push({ label: "Elev", key: "elev" });

    for (let i = 0; i < evaluari.length; i++) {
      headers.push({
        label: `${evaluari[i].nume}\n (${evaluari[i].pondere})`,
        key: evaluari[i].nume,
      });
    }
    headers.push({ medie: "Media", key: "medie" });

    for (let i = 0; i < elevi.length; i++) {
      let obj = { elev: elevi[i].nume + " " + elevi[i].prenume };
      for (let j = 0; j < evaluari.length; j++) {
        let gasit = false;

        for (let k = 0; k < evaluari[j].note.length && !gasit; k++) {
          if (evaluari[j].note[k].id_elev == elevi[i].id_elev) {
            obj[evaluari[j].nume] = evaluari[j].note[k].nota;
            gasit = true;
          }
        }
        if (!gasit) {
          obj[evaluari[j].nume] = "";
        }
      }
      obj["medie"] = this.getMedie(elevi[i].id_elev);
      data.push(obj);
    }
    return { headers: headers, data: data };
  };

  render() {
    return (
      <div>
        <CSVLink
          filename={`Raport ${this.props.clasa.numar} ${this.props.clasa.serie}-${this.props.clasa.denumire}.csv`}
          {...this.exportCSV()}
        >
          Exporta CSV
        </CSVLink>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Elev</th>
              <th>Media calculata</th>
              {this.state.evaluari.map((evaluare, index) => {
                return (
                  <th
                    key={index}
                    onClick={() => {
                      this.props.history.push(
                        "/profesor/detaliiEvaluare/" + evaluare.id
                      );
                    }}
                  >
                    {evaluare.nume}
                    <br></br>({evaluare.pondere})
                  </th>
                );
              })}
              <th>
                <Button
                  variant="primary"
                  onClick={() => {
                    this.props.history.push(
                      "/profesor/adaugaEvaluare/" +
                        this.props.id_semestru +
                        "/" +
                        this.props.id_repartizare
                    );
                  }}
                >
                  Adauga evaluare
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.elevi.map((elev, index) => {
              return (
                <tr>
                  <td>
                    {elev.nume} {elev.prenume}
                  </td>
                  <td>{this.getMedie(elev.id_elev)}</td>
                  {this.state.evaluari.map((evaluare, index) => {
                    return (
                      <td
                        onClick={(e) =>
                          this.editCell(e, evaluare, elev.id_elev)
                        }
                      >
                        {this.getNota(elev.id_elev, evaluare)}
                      </td>
                    );
                  })}
                  <td></td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Form.Group>
          <Button variant="primary" onClick={this.save}>
            Salveaza
          </Button>
        </Form.Group>
      </div>
    );
  }
}

export default withRouter(GradesTable);
