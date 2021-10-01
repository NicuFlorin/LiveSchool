import React from "react";
import { withRouter } from "react-router-dom";
import Grade from "../images/Grade.png";
import attendance from "../images/attendance.png";
import teacher from "../images/teacher.png";
import student from "../images/student.png";
import clasa from "../images/clasa.jpg";
import parent from "../images/parent.png";
import settings from "../images/settings.png";
class Homepage extends React.Component {
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
    if (this.getCookie("tip_utilizator") == "Parinte") {
      return (
        <div
          style={{
            display: "flex",
            width: "100%",

            flexWrap: "wrap",
          }}
        >
          <div
            style={{ width: "140px" }}
            onClick={() => this.props.history.push("/parinte/note")}
          >
            <img
              style={{ width: "100px", height: "100px", position: "absolute" }}
              src={Grade}
            ></img>
            <span
              style={{
                position: "relative",
                top: "105px",
                margin: "auto",
              }}
            >
              Note
            </span>
          </div>
          <div
            style={{ width: "140px" }}
            onClick={() => this.props.history.push("/parinte/participare")}
          >
            <img
              style={{ width: "100px", height: "100px", position: "absolute" }}
              src={attendance}
            ></img>
            <span
              style={{ position: "relative", margin: "auto", top: "105px" }}
            >
              Participare
            </span>
          </div>

          <div style={{ width: "140px" }}>
            <img
              style={{ width: "100px", height: "100px", position: "absolute" }}
              src={teacher}
            ></img>
            <span
              style={{ position: "relative", top: "105px", margin: "auto" }}
            >
              Contact profesori
            </span>
          </div>
        </div>
      );
    } else if (this.getCookie("tip_utilizator") == "Administrator") {
      return (
        <div style={{ width: "100%", display: "flex" }}>
          <div
            style={{ width: "140px", flex: "1" }}
            onClick={() => this.props.history.push("/admin/elevi")}
          >
            <img
              style={{ width: "100px", height: "100px", position: "absolute" }}
              src={student}
            ></img>
            <span
              style={{ position: "relative", top: "105px", margin: "auto" }}
            >
              Elevi
            </span>
          </div>

          <div
            style={{ width: "140px", flex: "1" }}
            onClick={() => this.props.history.push("/admin/profesori")}
          >
            <img
              style={{ width: "100px", height: "100px", position: "absolute" }}
              src={teacher}
            ></img>
            <span
              style={{ position: "relative", top: "105px", margin: "auto" }}
            >
              Profesori
            </span>
          </div>
          <div
            style={{ width: "140px", flex: "1" }}
            onClick={() => this.props.history.push("/admin/participare")}
          >
            <img
              style={{ width: "100px", height: "100px", position: "absolute" }}
              src={attendance}
            ></img>
            <span
              style={{ position: "relative", top: "105px", margin: "auto" }}
            >
              Participare
            </span>
          </div>
          <div
            style={{ width: "140px", flex: "1" }}
            onClick={() => this.props.history.push("/admin/clase")}
          >
            <img
              style={{ width: "100px", height: "100px", position: "absolute" }}
              src={clasa}
            ></img>
            <span
              style={{ position: "relative", top: "105px", margin: "auto" }}
            >
              Clase
            </span>
          </div>
          <div
            style={{ width: "140px", flex: "1" }}
            onClick={() => this.props.history.push("/admin/parinti")}
          >
            <img
              style={{ width: "100px", height: "100px", position: "absolute" }}
              src={parent}
            ></img>
            <span
              style={{ position: "relative", top: "105px", margin: "auto" }}
            >
              Parinti
            </span>
          </div>
          <div
            style={{ width: "140px", flex: "1" }}
            onClick={() => this.props.history.push("/admin/configurari")}
          >
            <img
              style={{ width: "100px", height: "100px", position: "absolute" }}
              src={settings}
            ></img>
            <span
              style={{ position: "relative", top: "105px", margin: "auto" }}
            >
              Setari
            </span>
          </div>
        </div>
      );
    } else if (this.getCookie("tip_utilizator") == "Profesor") {
      return (
        <div style={{ width: "100%", display: "flex" }}>
          <div
            style={{ width: "140px", flex: "1" }}
            onClick={() => this.props.history.push("/profesori/note")}
          >
            <img
              style={{ width: "100px", height: "100px", position: "absolute" }}
              src={Grade}
            ></img>
            <span
              style={{
                position: "relative",
                top: "105px",
                margin: "auto",
              }}
            >
              Note
            </span>
          </div>
          <div
            style={{ width: "140px", flex: "1" }}
            onClick={() => this.props.history.push("/profesori/participare")}
          >
            <img
              style={{ width: "100px", height: "100px", position: "absolute" }}
              src={attendance}
            ></img>
            <span
              style={{
                position: "relative",
                top: "105px",
                margin: "auto",
              }}
            >
              Participare
            </span>
          </div>
        </div>
      );
    } else if (this.getCookie("tip_utilizator") == "Elev") {
      return (
        <div style={{ width: "100%", display: "flex" }}>
          <div
            style={{ width: "140px" }}
            onClick={() => this.props.history.push("/elev/note")}
          >
            <img
              style={{ width: "100px", height: "100px", position: "absolute" }}
              src={Grade}
            ></img>
            <span
              style={{
                position: "relative",
                top: "105px",
                margin: "auto",
              }}
            >
              Note
            </span>
          </div>

          <div
            style={{ width: "140px" }}
            onClick={() => this.props.history.push("/elev/participare")}
          >
            <img
              style={{ width: "100px", height: "100px", position: "absolute" }}
              src={attendance}
            ></img>
            <span
              style={{
                position: "relative",
                top: "105px",
                margin: "auto",
              }}
            >
              Participare
            </span>
          </div>
        </div>
      );
    }
  }
}
export default withRouter(Homepage);
