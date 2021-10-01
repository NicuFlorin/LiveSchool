import React from "react";
import { Form } from "react-bootstrap";
import Student from "../data/Student";
import styled from "styled-components";
import Submenu from "./SubmenuParent";
const SidebarNav = styled.nav`
  background: #f7f6d5;
  width: 200px;
  height: 100vh;

  justify-content: center;
  position: fixed;

  top: 10.7vh;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

class ParentsSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elevi: [],
      search: "",
    };
  }

  async componentDidMount() {}

  handleChange = (e) => {
    this.setState({ search: e.target.value });
  };

  render() {
    return (
      <SidebarNav>
        <Form.Control
          placeholder="Cauta dupa elev"
          onChange={this.handleChange}
          style={{ width: "85%", marginLeft: "15px" }}
        />
        {this.props.elevi.map((elev, index) => {
          if (
            elev.nume.includes(this.state.search) ||
            elev.prenume.includes(this.state.search)
          )
            return (
              <Submenu
                item={elev}
                key={index}
                onSelectParent={this.props.onSelectParent}
                onAdd={this.props.onAdd}
              />
            );
        })}

        <SidebarWrap></SidebarWrap>
      </SidebarNav>
    );
  }
}

export default ParentsSidebar;
