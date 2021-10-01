import React from "react";
import styled from "styled-components";
import Submenu from "./ParentsGradesSubmenu";
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
class ParentGradesSidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SidebarNav>
        {this.props.copii.map((copil, index) => {
          return (
            <Submenu
              item={copil}
              key={index}
              onSelectDiscipline={this.props.onSelectDiscipline}
            />
          );
        })}

        <SidebarWrap></SidebarWrap>
      </SidebarNav>
    );
  }
}

export default ParentGradesSidebar;
