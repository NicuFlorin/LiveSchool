import React from "react";
import styled from "styled-components";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const SidebarLink = styled.a`
  display: flex;

  align-items: center;
  list-style: none;
  height: 60px;
  text-decoration: none;

  &:hover {
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropDownLabel = styled.a`
  height: 7px;
  padding-left: 2rem;
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

  selectParent = (parinte) => {
    if (this.props.onSelectParent) {
      this.props.onSelectParent(parinte);
    }
  };

  render() {
    let elev = this.props.item;

    return (
      <>
        <SidebarLink href="#" onClick={() => this.showSubnav()}>
          <SidebarLabel>
            Parintii lui {elev.nume} {elev.prenume}
          </SidebarLabel>
          <div style={{ right: 0, float: "right" }}>
            <AddCircleIcon
              onClick={() =>
                this.props.onAdd({
                  nume: elev.nume,
                  prenume: elev.prenume,
                  id: elev.id,
                })
              }
            />
          </div>
          <div>
            {elev.parinti && this.state.showSubnav
              ? elev.iconOpened
              : elev.parinti
              ? elev.iconClosed
              : null}
          </div>
        </SidebarLink>
        {this.state.showSubnav &&
          elev.parinti.map((parinte, index) => {
            return (
              <DropDownLabel onClick={() => this.selectParent(parinte)}>
                {parinte.nume} {parinte.prenume}
              </DropDownLabel>
            );
          })}
      </>
    );
  }
}

export default Submenu;
