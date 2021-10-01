import React from "react";
import { Form, Button } from "react-bootstrap";
import AssignmentForm from "../components/AssignmentForm";
import Assignment from "../data/Assignment";
import Login from "../data/login";
class AddAssignment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id_user: "",
    };
  }

  submit = async (assignment) => {
    assignment.id_repartizare = this.props.match.params.id_repartizare;
    assignment.id_semestru = this.props.match.params.id_semestru;
    let assignmentRes = await Assignment.add(assignment);
    if (assignmentRes.ok) {
      return assignmentRes.id_evaluare;
    } else return null;
  };

  componentDidMount = async () => {
    const userRes = await Login.getCurrentLoggedIn();
    if (!userRes.ok) {
      this.setState({ loading: false, error: "Login: " + userRes.message });
      return;
    }
    debugger;
    this.setState({ id_user: userRes.user.id });
  };

  render() {
    return (
      <div>
        <AssignmentForm
          tip="Adauga"
          onSubmit={this.submit}
          id_user={this.state.id_user}
          key={this.state.id_user}
        />
      </div>
    );
  }
}

export default AddAssignment;
