import React, { Component } from "react";
import "./index.scss";
import Rodal from "rodal";
import "../Rodal/rodalContentStyles.scss";
import AuthService from "../../services/AuthService";
import WithUser from "../../helpers/WithUser";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { setUserInfo } from "../../redux/actions/userActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      email: "",
      pass: "",
      errorMessage: "",
      menuVisible: false,
      searchVisible: false,
      searchValue: ""
    };
  }

  onChangeEmail = event => {
    this.setState({ email: event.target.value, errorMessage: "" });
  };

  onChangePass = event => {
    this.setState({ pass: event.target.value, errorMessage: "" });
  };

  onChangeSearch = event => {
    this.setState({ searchValue: event.target.value });
  };

  show = () => {
    this.setState({ visible: true, email: "", pass: "", errorMessage: "" });
  };

  hide = () => {
    this.setState({ visible: false });
  };

  handleLogin = async e => {
    e.preventDefault();
    let { email, pass } = this.state;

    this.setState({ errorMessage: "" });

    if (!email || !pass) {
      this.setState({ errorMessage: "Email y password necesarios para login" });
      return;
    }

    const error = await AuthService.login(email, pass);

    if (error) {
      this.setState({ errorMessage: AuthService.getErrorMessage(error) });
    } else {
      this.setState({ visible: false });
      this.props.history.push("/search/");
    }
  };

  handleSearch = (e) => {
    // e.preventDefault();
    this.props.history.push("/search/" + this.state.searchValue);
  };

  logout = () => {
    AuthService.logout();
    this.props.setUserInfo(null);
    // document.location.reload();
    this.setState({ menuVisible: false });
    this.props.history.push("/");
  };

  showMenu = () => {
    if (!this.state.menuVisible) {
      this.setState({ menuVisible: true, searchVisible: false });
    } else {
      this.setState({ menuVisible: false });
    }
  };

  showSearch = () => {
    if (!this.state.searchVisible) {
      this.setState({ searchVisible: true, menuVisible: false });
    } else {
      this.setState({ searchVisible: false });
    }
  };

  render() {
    const {
      visible,
      email,
      pass,
      errorMessage,
      searchVisible,
      menuVisible
    } = this.state;

    return (
      <div>
        <div id="navBar">
          <Link to={"/search/?"}>
            <img
              id="logo-nav"
              src={require("../../img/HourLogo_(light).png")}
              alt="logo hour teachers"
            />
          </Link>

          {!this.props.userInfo && (
            <button id="login-button" onClick={this.show}>
              Login
            </button>
          )}


          { this.props.userInfo && 
            <form id="search-interface-up" onSubmit={this.handleSearch}>
                <input
                  onChange={this.onChangeSearch}
                  id="search-input-up"
                  type="text"
                />
                <button id="search-form-input-up"><FontAwesomeIcon className="icon-input-up" icon="search" /></button>
            </form>



          }





          {this.props.userInfo && (
            <div id="botonera">
              <div id="nav-bar-username">{this.props.userInfo.name}</div>
              <button id="search-button" onClick={this.showSearch}>
                <FontAwesomeIcon className="iconNav" icon="search" />
              </button>
              <button onClick={this.showMenu} id="user-button">
                <FontAwesomeIcon className="iconNav" icon="user" />
              </button>
            </div>
          )}
          <Rodal
            customStyles={{
              backgroundColor: "#202D3F",
              color: "#F5F5F5",
              borderRadius: "25px"
            }}
            visible={visible}
            onClose={this.hide}
            width={250}
            height={300}
            animation={"slideUp"}
            className="rodal-div"
          >
            <div className="rodal-title">Log in</div>
            <form onSubmit={this.handleLogin}>
              <input
                className="rodal-input-text"
                onChange={this.onChangeEmail}
                type="text"
                placeholder="e-mail"
                autoComplete="username"
                value={email}
              />
              <input
                className="rodal-input-text"
                onChange={this.onChangePass}
                type="password"
                placeholder="password"
                value={pass}
                autoComplete="current-password"
              />
              <button className="rodal-send-button">Send ></button>
            </form>
            <div className="rodal-error-message">{errorMessage}</div>
          </Rodal>
        </div>

        {/* _____________________________________________________________Menu de búsqueda */}
        
          <div id="search" className={searchVisible ? 'visible' : null }>
            <form id="search-interface" onSubmit={this.handleSearch}>
              <input
                onChange={this.onChangeSearch}
                id="search-input"
                type="text"
              />
              <button id="search-form-input">Search</button>
            </form>
          </div>
        

        {/* _____________________________________________________________Menu de opciones de usuario */}
        
          <div id="opciones" className={menuVisible ? 'visible' : null }>
            <ul id="contenedor-opciones">
              <Link
                onClick={this.showMenu}
                className="linkote"
                to={`/EditProfile`}
              >
                <li className="opcion-menu">
                  <span className="text-menu">Edit profile</span>
                </li>
              </Link>
              <Link
                onClick={this.showMenu}
                className="linkote"
                to={`/myContacts`}
              >
              <li className="opcion-menu">
                <span className="text-menu">Contacts</span>
              </li>
              </Link>
              <Link
                onClick={this.showMenu}
                className="linkote"
                to={`/myRequests`}
              >
              <li className="opcion-menu">
                <span className="text-menu">Requests</span>
              </li>
              </Link>

              <Link
                onClick={this.showMenu}
                className="linkote"
                to={`/myTalents`}
              >
              <li className="opcion-menu">
                <span className="text-menu">My Talents</span>
              </li>
              </Link>
              <Link
                onClick={this.showMenu}
                className="linkote"
                to={`/favoriteTalents`}
              >
              <li className="opcion-menu">
                <span className="text-menu">Favorites</span>
              </li></Link>
              {this.props.userInfo!==null && <div>{this.props.userInfo.reviewsPending.length>0 && 
                              <Link
                              onClick={this.showMenu}
                              className="linkote"
                              to={`/pendingReviews`}
                            >
                            <li className="opcion-menu">
                                <FontAwesomeIcon icon="award" className="icono-notificacion" /><span className="text-menu">Pending Reviews</span>
                            </li></Link>}</div>}
              <li onClick={this.logout} className="opcion-menu">
                <span className="text-menu">Logout</span>
              </li>
            </ul>
          </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUserInfo: user => dispatch(setUserInfo(user))
  };
};

const NavigationBarWithRouter = withRouter(WithUser(NavigationBar));

export default connect(
  null,
  mapDispatchToProps
)(NavigationBarWithRouter);
