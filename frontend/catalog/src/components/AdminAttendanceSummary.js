import React from "react";
import { Table } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
class AdminAttendanceSummary extends React.Component {
  constructor(props) {
    super(props);
  }

  getNrParticipare = (attendance, tip) => {
    let nr = 0;
    for (let i = 0; i < attendance.length; i++) {
      if (attendance[i].tip_participare == tip) {
        nr++;
      }
    }
    return nr;
  };

  render() {
    return (
      <Table>
        <thead>
          <tr>
            <th>Elev</th>
            <th>Prezente</th>
            <th>Absente Nemotivate</th>
            <th>Total absente nemotivate</th>
            <th>Detalii</th>
          </tr>
        </thead>
        <tbody>
          {this.props.elevi.map((elev) => {
            return (
              <tr>
                <td>
                  {elev.nume} {elev.prenume}
                </td>
                <td>{this.getNrParticipare(elev.attendance, "Prezent")}</td>
                <td>
                  {this.getNrParticipare(elev.attendance, "Absent Nemotivat")}
                </td>
                <td>{elev.nrTotalNemotivate}</td>
                <td
                  onClick={() => {
                    localStorage.setItem("id_user", elev.id_utilizator);
                    this.props.history.push(
                      "/admin/detaliiParticipareElev/" + this.props.currentDate
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
    );
  }
}

export default withRouter(AdminAttendanceSummary);
