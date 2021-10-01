import React from "react";
import { Table, Form } from "react-bootstrap";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { withRouter } from "react-router-dom";

class StudentGrades extends React.Component {
  constructor(props) {
    super(props);
  }

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

  render() {
    debugger;
    let grades = this.props.grades;
    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>Tip evaluare</th>
              <th>Nota</th>
              <th>Pondere</th>
              <th>Data</th>
              <th>Detalii</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((grade) => {
              debugger;
              return (
                <tr>
                  <td>{grade.tip_evaluare}</td>
                  <td>{grade.nota}</td>
                  <td>{grade.pondere}</td>
                  <td>{grade.data_nota}</td>
                  <td
                    onClick={() => {
                      if (this.getCookie("tip_utilizator") == "Elev")
                        this.props.history.push(
                          `/elev/detaliiNota/${grade.id_evaluare}`
                        );
                      else if (this.getCookie("tip_utilizator") == "Parinte")
                        this.props.history.push(
                          `/parinte/detaliiNota/${grade.id_evaluare}`
                        );
                    }}
                  >
                    <ArrowForwardIcon />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}
export default withRouter(StudentGrades);
