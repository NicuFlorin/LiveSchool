import React from "react";
import { Table } from "react-bootstrap";
import Teacher from "../data/Teacher";
import Assignment from "../data/Assignment";
import { firebaseApp } from "../firebaseConfig";
import Login from "../data/login";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import DeleteIcon from "@material-ui/icons/Delete";
import AddFilesModal from "../components/AddFilesModal";
class StudentAssignmentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assignment: "",
      teacherFiles: [],
      studentFiles: [],
      id_user: "",
      file_name: null,
      url: null,
      showModal: false,
    };
  }

  showModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  getFiles = async (id_profesor, id_evaluare) => {
    try {
      const firebaseRef = firebaseApp
        .storage()
        .ref("/assignments/" + id_profesor + "/" + id_evaluare);

      let files = await firebaseRef.listAll();
      let aux = this.state.teacherFiles;
      for (let i = 0; i < files.items.length; i++) {
        let url = await files.items[i].getDownloadURL();
        let file_name = files.items[i].name;

        aux.push({ file_name: file_name, url: url });
      }
      this.setState({ teacherFiles: aux });
      console.log(firebaseRef);
    } catch (err) {
      console.log(err);
    }
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

  async componentDidMount() {
    const userRes = await Login.getCurrentLoggedIn();
    if (!userRes.ok) {
      this.setState({ loading: false, error: "Login: " + userRes.message });
      return;
    }

    if (this.getCookie("tip_utilizator") == "Parinte") {
      userRes.user.id = localStorage.getItem("id_user");
    }

    let assignmentRef = await Assignment.getByIdAndUser(
      this.props.match.params.id_evaluare,
      userRes.user.id
    );
    if (assignmentRef.ok) {
      let profesorRes = await Teacher.getTeacherByRepartizare(
        assignmentRef.assignment.id_repartizare
      );
      if (profesorRes.ok) {
        this.setState({ assignment: assignmentRef.assignment });
        await this.getFiles(
          profesorRes.id_profesor,
          assignmentRef.assignment.id
        );
      }
    }
    await this.getStudentFiles(userRes.user.id);
    this.setState({ id_user: userRes.user.id });
  }

  fileUpload = async (e) => {
    let file = e.target.files[0];
    const storageRef = firebaseApp.storage().ref();

    const fileRef = storageRef.child(
      `/answears/${this.state.id_user}/${this.props.match.params.id_evaluare}`
    );
    fileRef
      .child(file.name)
      .put(file)
      .then(() => console.log("uploaded!"))
      .catch((err) => console.log(err));
  };

  getCurrentDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    return yyyy + "-" + mm + "-" + dd;
  };

  getStudentFiles = async (id_user) => {
    try {
      const firebaseRef = firebaseApp
        .storage()
        .ref(
          "/answears/" + id_user + "/" + this.props.match.params.id_evaluare
        );

      let files = await firebaseRef.listAll();
      if (files.items.length > 0) {
        let url = await files.items[0].getDownloadURL();
        let file_name = files.items[0].name;

        this.setState({ file_name: file_name, url: url });
      }
    } catch (err) {
      console.log(err);
    }
  };

  deleteFile = async () => {
    try {
      const firebaseRef = firebaseApp
        .storage()
        .ref(
          "/answears/" +
            this.state.id_user +
            "/" +
            this.props.match.params.id_evaluare
        );

      let files = await firebaseRef.listAll();
      if (files.items.length > 0) {
        await files.items[0].delete();
      }
      this.setState({ url: null, file_name: "" });
    } catch (err) {
      console.log(err);
    }
  };

  update = async () => {
    await this.getStudentFiles(this.state.id_user);
  };
  getCurrentTime = () => {
    let today = new Date();
    return today.getHours() + ":" + today.getMinutes();
  };

  checkDeadline = () => {
    let currentDate = this.getCurrentDate();
    if (currentDate < this.state.assignment.termen_raspuns) {
      return true;
    } else if (currentDate == this.state.assignment.termen_raspuns) {
      let currentTime = this.getCurrentTime();
      if (
        Date.parse(
          `2021-01-01 ${currentTime}` <
            `2021-01-01 ${this.state.assignment.ora_deadline}`
        )
      ) {
        return true;
      }
    }
    return false;
  };

  render() {
    return (
      <div>
        {this.state.assignment !== "" && (
          <div>
            <div
              dangerouslySetInnerHTML={{
                __html: this.state.assignment.descriere,
              }}
            ></div>
            <div>
              {this.state.teacherFiles.map((file) => (
                <a href={file.url}>
                  {file.file_name}
                  <br></br>
                </a>
              ))}
            </div>
            <Table style={{ width: "500px", marginLeft: "50vh" }}>
              <tbody>
                <tr>
                  <td>Nume</td>
                  <td>{this.state.assignment.nume}</td>
                </tr>
                <tr>
                  <td>Tip evaluare</td>
                  <td>{this.state.assignment.tip_evaluare}</td>
                </tr>
                <tr>
                  <td>Nota</td>
                  {this.state.assignment.nota !== "" ? (
                    <td>{this.state.assignment.nota}</td>
                  ) : (
                    <td>Fara nota</td>
                  )}
                </tr>
                <tr>
                  <td>Pondere</td>
                  <td>{this.state.assignment.pondere}</td>
                </tr>
                <tr>
                  <td>Rezolvare</td>
                  <td>
                    {this.state.url ? (
                      <div>
                        <a href={this.state.url}>{this.state.file_name}</a>
                        {this.getCookie("tip_utilizator") == "Elev" &&
                          this.checkDeadline() && (
                            <DeleteIcon onClick={this.deleteFile} />
                          )}
                      </div>
                    ) : (
                      <div>
                        {this.getCookie("tip_utilizator") == "Elev" &&
                          this.checkDeadline() && (
                            <CloudUploadIcon onClick={this.showModal} />
                          )}
                      </div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Data raspuns</td>
                  <td>
                    {this.state.assignment.termen_raspuns !== "" ? (
                      <td>{this.state.assignment.termen_raspuns}</td>
                    ) : (
                      <td>Nespecificat</td>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Ora</td>
                  <td>
                    {this.state.assignment.ora !== "" ? (
                      <td>{this.state.assignment.ora_deadline}</td>
                    ) : (
                      <td>Nespecificat</td>
                    )}
                  </td>
                </tr>
              </tbody>
            </Table>
            {this.state.assignment.feedback &&
              this.state.assignment.feedback !== "" && (
                <div style={{ display: "flex" }}>
                  <h5>Feedback:</h5>
                  <br></br>
                  <p>{this.state.assignment.feedback}</p>
                </div>
              )}
          </div>
        )}
        <AddFilesModal
          show={this.state.showModal}
          onHide={this.closeModal}
          tip="answears"
          id_evaluare={this.props.match.params.id_evaluare}
          id_user={this.state.id_user}
          onUpdate={this.update}
        />
      </div>
    );
  }
}

export default StudentAssignmentPage;
