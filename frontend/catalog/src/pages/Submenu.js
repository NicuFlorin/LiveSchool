import React from "react";

import styled from "styled-components";

const SidebarLink = styled.a`
  display: flex;
  padding-left: 1rem;
  align-items: center;
  list-style: none;
  height: 30px;
  text-decoration: none;
  margins: 1rem;
  &:hover {
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropDownLabel = styled.a`
  padding-left: 4rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  text-decoration: none;

  &:hover {
    cursor: pointer;
  }
`;

class Submenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSubnav: false,
    };
  }

  showSubnav = () => {
    this.setState({ showSubnav: !this.state.showSubnav });
  };

  selectClass = (clasa, denumire) => {
    if (this.props.onSelectClass) {
      clasa.denumire = denumire;
      this.props.onSelectClass(clasa);
    }
  };

  render() {
    let item = this.props.item;
    return (
      <>
        <SidebarLink href="#" onClick={() => this.showSubnav()}>
          <SidebarLabel>{item.denumire}</SidebarLabel>
          <div>
            {item.clase && this.state.showSubnav
              ? item.iconOpened
              : item.clase
              ? item.iconClosed
              : null}
          </div>
        </SidebarLink>

        {this.state.showSubnav &&
          item.clase.map((clasa, index) => {
            return (
              <DropDownLabel
                onClick={() => this.selectClass(clasa, item.denumire)}
              >
                {clasa.numar} {clasa.serie}
              </DropDownLabel>
            );
          })}
      </>
    );
  }
}
export default Submenu;
