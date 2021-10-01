import React from "react";
import { Modal, Form, Row, Col } from "react-bootstrap";

class SelectClass extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange = (e) => {
    const index = e.target.selectedIndex;
    const optionElement = e.target.childNodes[index];
    const optionElementId = optionElement.getAttribute("id");
    this.props.onSelectClass(optionElementId);
  };

  render() {
    return (
      <div>
        <Form.Control
          name="clasa"
          as="select"
          style={{ width: "100%" }}
          onChange={this.handleChange}
          defaultValue={this.props.defaultValue}
        >
          <option hidden>Clasa</option>
          {this.props.tip_utilizator == "Administrator" && (
            <option id="RE" value="RE">
              Repetenti
            </option>
          )}
          {!this.props.defaultValue && (
            <option id="all" value="all">
              All
            </option>
          )}

          {this.props.clase.map((clasa, index) => {
            if (
              this.props.infoStudentSelected &&
              this.props.infoStudentSelected.serie == "RE"
            ) {
              if (this.props.infoStudentSelected.numar == clasa.numar) {
                return (
                  <option id={clasa.id} value={clasa.id}>
                    {clasa.numar} {clasa.serie}
                  </option>
                );
              }
            } else
              return (
                <option id={clasa.id} value={clasa.id}>
                  {clasa.numar} {clasa.serie}
                </option>
              );
          })}
        </Form.Control>
      </div>
    );
  }
}

export default SelectClass;
