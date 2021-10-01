import React from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import Submenu from "./Submenu";

const SidebarNav = styled.nav`
  background: #f7f6d5;
  width: 200px;
  height: 100vh;

  justify-content: center;
  position: fixed;
  float: right;
  right: 0;
  top: 10.7vh;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

class RepartizareSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      discipline: [],
    };
  }
  componentDidMoun() {
    this.setState({ discipline: this.props.repartizare });
  }

  render() {
    return (
      <SidebarNav>
        {this.props.tip_utilizator === "Administrator" && (
          <Button
            variant="primary"
            onClick={this.props.showModalRepartizare}
            style={{ width: "90%", marginLeft: "7px" }}
          >
            Adauga curs
          </Button>
        )}

        <SidebarWrap>
          {this.props.repartizare.map((disciplina, index) => {
            return (
              <Submenu
                item={disciplina}
                key={index}
                onSelectClass={this.props.onSelectClass}
              />
            );
          })}
        </SidebarWrap>
      </SidebarNav>
    );
  }
}
export default RepartizareSidebar;
