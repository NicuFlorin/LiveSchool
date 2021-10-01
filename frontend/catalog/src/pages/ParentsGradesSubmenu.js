import React from "react";
import styled from "styled-components";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const SidebarLink = styled.a`
  display: flex;
  margin-left: 1rem;
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
  height: 5px;
  margin-left: 2rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 1rem;
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
    let copil = this.props.item;

    return (
      <>
        <SidebarLink href="#" onClick={() => this.showSubnav()}>
          {copil.prenume}
          <div>
            {copil.discipline && this.state.showSubnav
              ? copil.iconOpened
              : copil.discipline
              ? copil.iconClosed
              : null}
          </div>
        </SidebarLink>
        {this.state.showSubnav &&
          copil.discipline.map((disciplina, index) => {
            return (
              <DropDownLabel
                onClick={() =>
                  this.props.onSelectDiscipline(
                    disciplina,
                    copil.id,
                    copil.id_utilizator
                  )
                }
              >
                {disciplina.denumire}
              </DropDownLabel>
            );
          })}
      </>
    );
  }
}

export default Submenu;
