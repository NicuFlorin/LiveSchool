import React, { Component } from "react";
import Login from "../data/login";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import SchoolYear from "../data/SchoolYear";
import Homepage from "../pages/Homepage";
class NavMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountName: "",
      id_user: "",
      aniScolari: [],
      selectedYear: "",
    };
  }

  getCurrentDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;
    return today;
  }

  getAniScolari = async (id_scoala) => {
    let aniScolariRes = await SchoolYear.getBySchool(id_scoala);
    if (aniScolariRes.ok) {
      return aniScolariRes.aniScolari;
    }
    return null;
  };

  getCurrentYear = (aniScolari, currentDate) => {
    for (let i = 0; i < aniScolari.length; i++) {
      if (
        aniScolari[i].data_inceput <= currentDate &&
        aniScolari[i].data_sfarsit >= currentDate
      ) {
        localStorage.setItem("id_an_scolar", aniScolari[i].id);
        return aniScolari[i];
      }
    }
    return aniScolari[aniScolari.length - 1];
  };

  getCurrentYearById = (aniScolari) => {
    aniScolari = aniScolari.filter(
      (anScolar) => anScolar.id == localStorage.getItem("id_an_scolar")
    );
    return aniScolari[0];
  };

  componentDidMount() {
    let currentDate = this.getCurrentDate();

    Login.getCurrentLoggedIn().then(async (res) => {
      if (res.ok) {
        debugger;
        let aniScolari = await this.getAniScolari(res.user.id_scoala);
        let id_an_scolar = localStorage.getItem("id_an_scolar");
        let currentYear;
        if (id_an_scolar) {
          currentYear = this.getCurrentYearById(aniScolari);
        } else currentYear = this.getCurrentYear(aniScolari, currentDate);
        if (currentYear != null) {
          this.setState({
            accountName: res.user.nume + " " + res.user.prenume,
            id_user: res.user.id,

            aniScolari: aniScolari,
            selectedYear:
              this.props.selectedYear !== ""
                ? this.props.selectedYear
                : currentYear,
          });

          this.props.onSelectYear(currentYear);
        }
      }
    });
  }
  logout = async () => {
    await Login.logout();
    window.history.pushState(
      { previousUrl: window.location.pathname },
      "",
      "/login"
    );
    window.location.reload();
  };

  renderItems = () => {
    return (
      <>
        {this.props.tip_utilizator == "Administrator" && (
          <Nav className="mr-auto">
            <Nav.Link
              href="/"
              active={(/*match*/ _, location) =>
                ["/"].includes(location.pathname)
              }
            >
              Homepage
            </Nav.Link>
            <Nav.Link
              href="/admin/elevi"
              active={(/*match*/ _, location) =>
                ["/", "/admin/elevi"].includes(location.pathname)
              }
            >
              Elevi
            </Nav.Link>
            <Nav.Link
              href="/admin/profesori"
              active={(/*match*/ _, location) =>
                ["/", "/admin/profesori"].includes(location.pathname)
              }
            >
              Profesori
            </Nav.Link>
            <Nav.Link
              href="/admin/clase"
              active={(/*match*/ _, location) =>
                ["/admin/clase"].includes(location.pathname)
              }
            >
              Clase
            </Nav.Link>
            <Nav.Link
              href="/admin/participare"
              active={(/*match*/ _, location) =>
                ["/admin/participare"].includes(location.pathname)
              }
            >
              Participare
            </Nav.Link>
            <Nav.Link
              href="/admin/parinti"
              active={(/*match*/ _, location) =>
                ["/admin/parinti"].includes(location.pathname)
              }
            >
              Parinti
            </Nav.Link>
            <Nav.Link
              href="/admin/configurari"
              active={(/*match*/ _, location) =>
                ["/admin/configurari"].includes(location.pathname)
              }
            >
              Configurari
            </Nav.Link>
          </Nav>
        )}
        {this.props.tip_utilizator === "Profesor" && (
          <Nav className="mr-auto">
            <Nav.Link
              href="/"
              active={(/*match*/ _, location) =>
                ["/", "/profesor/note"].includes(location.pathname)
              }
            >
              Homepage
            </Nav.Link>
            <Nav.Link
              href="/profesor/note"
              active={(/*match*/ _, location) =>
                ["/", "/profesor/note"].includes(location.pathname)
              }
            >
              Note
            </Nav.Link>
            <Nav.Link
              href="/profesor/participare"
              active={(/*match*/ _, location) =>
                ["/", "/profesor/participare"].includes(location.pathname)
              }
            >
              Participare
            </Nav.Link>
          </Nav>
        )}
        {this.props.tip_utilizator === "Elev" && (
          <Nav className="mr-auto">
            <Nav.Link
              href="/elev/note"
              active={(/*match*/ _, location) =>
                ["/", "/elev/note"].includes(location.pathname)
              }
            >
              Note
            </Nav.Link>
            <Nav.Link
              href="/elev/participare"
              active={(/*match*/ _, location) =>
                ["/", "/elev/participare"].includes(location.pathname)
              }
            >
              Participare
            </Nav.Link>
            <Nav.Link
              href="/elev/profesori"
              active={(/*match*/ _, location) =>
                ["/", "/elev/profesori"].includes(location.pathname)
              }
            >
              Profesori
            </Nav.Link>
          </Nav>
        )}
        {this.props.tip_utilizator === "Parinte" && (
          <Nav className="mr-auto">
            <Nav.Link
              href="/"
              active={(/*match*/ _, location) =>
                ["/"].includes(location.pathname)
              }
            >
              Homepage
            </Nav.Link>
            <Nav.Link
              href="/parinte/note"
              active={(/*match*/ _, location) =>
                ["/", "/parinte/note"].includes(location.pathname)
              }
            >
              Note
            </Nav.Link>
            <Nav.Link
              href="/parinte/participare"
              active={(/*match*/ _, location) =>
                ["/", "/parinte/participare"].includes(location.pathname)
              }
            >
              Participare
            </Nav.Link>
          </Nav>
        )}
      </>
    );
  };

  selectYear = (anScolar) => {
    this.props.onSelectYear(anScolar);

    this.setState({ selectedYear: anScolar });
  };

  render() {
    return (
      <>
        <header>
          <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Navbar.Brand href="/">Catalog electronic</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              {this.renderItems()}
              <Nav>
                <NavDropdown
                  alignRight
                  title={this.state.accountName}
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item /*href={"/student/" + this.state.studId}*/>
                    {"User id: " + this.state.id_user}
                  </NavDropdown.Item>

                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={this.logout}>
                    Log out
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown
                  alignRight
                  title={
                    this.state.selectedYear != ""
                      ? "Anul scolar " +
                        this.state.selectedYear.data_inceput.split("-")[0] +
                        "-" +
                        this.state.selectedYear.data_sfarsit.split("-")[0]
                      : ""
                  }
                >
                  {this.state.aniScolari.map((anScolar, index) => {
                    return (
                      <NavDropdown.Item
                        onClick={() => this.selectYear(anScolar)}
                      >
                        {"Anul scolar: " +
                          anScolar.data_inceput +
                          "-" +
                          anScolar.data_sfarsit}
                      </NavDropdown.Item>
                    );
                  })}
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </header>
      </>
    );
  }
}

export default NavMenu;
