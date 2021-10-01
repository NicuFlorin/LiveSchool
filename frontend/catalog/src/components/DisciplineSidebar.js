import React from "react";
import styled from "styled-components";
import { Button, Form } from "react-bootstrap";
import SelectClass from "../components/SelectClass";
const Nav = styled.div`
  background: #f7f6d5;
  height: 80vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #f7f6d5;
  width: 200px;
  height: 100vh;

  justify-content: center;
  position: fixed;
  top: 10.7vh;
  overflow-y: scroll;
`;

const SidebarLink = styled.a`
  display: flex;
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

class DisciplineSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id_clasa: "",
    };
  }

  render() {
    let items = this.props.discipline;
    return (
      <SidebarNav>
        {items.map((item, index) => {
          return (
            <SidebarLink
              key={index}
              onClick={() => {
                this.props.onSelect(item);
              }}
            >
              <SidebarLabel>{item.denumire}</SidebarLabel>
            </SidebarLink>
          );
        })}
      </SidebarNav>
    );
  }
}

export default DisciplineSidebar;
