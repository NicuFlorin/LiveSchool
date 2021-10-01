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

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      id_clasa: "",
    };
  }

  getCookie = (name) => {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
      begin = dc.indexOf(prefix);
      if (begin != 0) return null;
    } else {
      begin += 2;
    }
    var end = document.cookie.indexOf(";", begin);
    if (end == -1) {
      end = dc.length;
    }
    return unescape(dc.substring(begin + prefix.length, end));
  };

  selectClass = (id_clasa) => {
    this.setState({ id_clasa: id_clasa });
  };

  filterByClass = () => {
    let elevi;
    if (this.state.id_clasa == "RE") {
      elevi = this.props.item.filter((elev) => elev.serie == "RE");
    } else if (this.state.id_clasa == "all") {
      return this.props.item;
    } else {
      elevi = this.props.item.filter(
        (elev) => elev.id_clasa == this.state.id_clasa && elev.serie !== "RE"
      );
    }

    return elevi;
  };

  render() {
    let items = this.props.item;
    if (this.state.id_clasa !== "") {
      items = this.filterByClass();
    }
    return (
      <SidebarNav>
        {this.getCookie("tip_utilizator") == "Administrator" && (
          <Button
            variant="primary"
            style={{ width: "90%", marginTop: "5px", marginLeft: "10px" }}
            onClick={() => this.props.onAdd()}
          >
            Adauga {this.props.dataName}
          </Button>
        )}

        {this.props.clase && (
          <div
            style={{
              width: "90%",
              textAlign: "center",
              marginLeft: "10px",
              marginTop: "5px",
            }}
          >
            <SelectClass
              clase={this.props.clase}
              onSelectClass={this.selectClass}
              tip_utilizator="Administrator"
            />
          </div>
        )}

        {this.getCookie("tip_utilizator") == "Administrator" && (
          <Form.Control
            name="search"
            placeholder="search"
            onChange={(e) => {
              this.setState({ search: e.target.value });
            }}
            style={{
              width: "90%",
              marginTop: "5px",
              marginLeft: "10px",
            }}
          ></Form.Control>
        )}

        {items.map((item, index) => {
          let label = item.nume ? item.nume : item.numar ? item.numar : "";
          if (item.prenume) {
            label += " " + item.prenume;
          } else if (item.serie) {
            label += " " + item.serie;
          }
          if (
            label.toLowerCase().includes(this.state.search) ||
            (this.state.id_clasa != "" && item.id_clasa == this.state.id_clasa)
          )
            return (
              <SidebarLink
                key={index}
                onClick={() => {
                  this.props.onSelectItem(item);
                }}
              >
                <SidebarLabel>{label}</SidebarLabel>
              </SidebarLink>
            );
        })}
      </SidebarNav>
    );
  }
}

export default Sidebar;
