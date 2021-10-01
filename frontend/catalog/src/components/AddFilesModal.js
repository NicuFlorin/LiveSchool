import React from "react";
import { Modal, Button } from "react-bootstrap";
import { firebaseApp } from "../firebaseConfig";

class AddFilesModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { files: [] };
  }

  submit = async () => {
    debugger;
    const storageRef = firebaseApp.storage().ref();

    let file = this.state.files[0];
    const fileRef = storageRef.child(
      `/${this.props.tip}/${this.props.id_user}/${this.props.id_evaluare}`
    );
    try {
      await fileRef.child(file.name).put(file);
    } catch (err) {
      console.log(err);
    }

    if (this.props.onUpdate) {
      this.props.onUpdate();
    }
    this.props.onHide();
  };

  componentDidMount() {}

  handleChange = (e) => {
    this.setState({ files: e.target.files });
  };

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Adauga Fisier</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ width: "400px", margin: "20px auto 20px auto" }}>
            <div class="custom-file-container" data-upload-id="myupload">
              <label>
                File Upload{" "}
                <a
                  href="javascript:void(0)"
                  className="custom-file-container__image-clear"
                >
                  &times;
                </a>
              </label>
              <label class="custom-file-container__custom-file">
                <input
                  type="file"
                  class="custom-file-container__custom-file__custom-file-input"
                  accept="*"
                  multiple
                  aria-label="Multiple Select Files"
                  onChange={this.handleChange}
                />
                <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                <span class="custom-file-container__image-preview"></span>
              </label>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => this.props.onHide()}>
            Close
          </Button>
          <Button variant="primary" onClick={this.submit}>
            Adauga
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default AddFilesModal;
