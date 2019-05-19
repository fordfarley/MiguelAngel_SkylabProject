import { withRouter } from "react-router-dom";
import WithUser from "../helpers/WithUser";
import "./styles/EditProfile.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { connect } from "react-redux";
import { setUserInfo } from "../redux/actions/userActions";
import StorageService from "../services/StorageService";

import Rodal from "rodal";
import "../components/Rodal/rodalContentStyles.scss";

import React, { Component } from "react";
import DataService from "../services/DataService/index";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      hosts: true,
      photo: null,
      visible: false
    };
  }

  onChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeInputChecked = e => {
    this.setState({ [e.target.name]: e.target.checked });
  };

  componentDidMount() {
    if (this.props.userInfo !== null) {
      this.setForm();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userInfo === null && this.props.userInfo !== null) {
      this.setForm();
    }
  }

  setForm = () => {
    let { name, phone, hosts, photo } = this.props.userInfo;
    // let location=this.props.userInfo.location;
    this.setState({ name, phone, hosts, photo });
  };

  setLocation = () => {
    this.props.history.push("/editLocation");
  };

  saveInfo = async () => {
    let { name, phone, hosts, photo } = this.state;
    console.log({ name, phone, hosts, photo });
    await DataService.updateDetail("users", this.props.userInfo.uid, {
      name,
      phone,
      hosts,
      photo
    });

    let user = this.props.userInfo;
    user.name = name;
    user.phone = phone;
    user.hosts = hosts;
    user.photo = photo;

    this.props.setUserInfo(user);
    this.setState({ visible: true });
  };

  goBack = () => {
    this.props.history.push("/search");
  };

  uploadPhoto = e => {
    const file = e.target.files[0];
    // file.name = "User-profile-"+this.props.userInfo.uid;
    //   console.log("file",file);
    //   console.log("TCL: ContactForm -> onFileSelected -> file", file)
    if (file) {
      StorageService.uploadFile(file, "contact-images", imageUrl => {
        this.setState({ photo: imageUrl });
      });
    }

    console.log(this.state.photo);
  };

  renderRodal = () => {
    return (
      <Rodal
        customStyles={{
          backgroundColor: "#202D3F",
          color: "#F5F5F5",
          borderRadius: "25px"
        }}
        visible={this.state.visible}
        onClose={this.hide}
        width={250}
        height={140}
        animation={"slideUp"}
        className="rodal-div"
      >
        <div className="rodal-title">Location Saved</div>
        <button onClick={this.hide} className="rodal-send-button">
          Ok >
        </button>
      </Rodal>
    );
  };

  hide = () => {
    this.setState({ visible: false });
    this.props.history.push("/search");
  };

  render() {
    let { name, phone, photo, hosts } = this.state;
    return (
      <div id="home-page">
        {this.props.userInfo && (
          <div id="profile-info">
            <img id="user-photo" src={photo} alt="profile user" />
            <input id="user-file" type="file" onChange={this.uploadPhoto} />
            <div id="recomendation">Preferred size: 300x300</div>
            <label
              id="label-file"
              className={"profile-button"}
              htmlFor="user-file"
            >
              Edit photo
            </label>
            <div>
              <span className="profile-label">Username:</span>
              <input
                className="profile-input"
                name="name"
                onChange={this.onChangeInput}
                type="text"
                value={name}
              />
            </div>
            <div>
              <span className="profile-label">Phone:</span>
              <input
                className="profile-input"
                name="phone"
                onChange={this.onChangeInput}
                type="tel"
                value={phone}
              />
            </div>
            <div id="hosts-container">
              <span className="profile-label">Hosts classes:</span>
              <input
                id="check-hosts"
                name="hosts"
                onChange={this.onChangeInputChecked}
                type="checkbox"
                checked={hosts}
              />
            </div>
            <div id="location-container">
              {/* <div className="location-item">
                        <div className="label-button">Set location to current</div>
                        <button className={"profile-button-circle"} 
                                onClick={this.setCurrentLocation}>
                                <FontAwesomeIcon icon="map-pin"/>
                        </button>
                      </div> */}
              <div className="location-item">
                <div className="label-button">Set location to address</div>
                <button
                  className={"profile-button-circle"}
                  onClick={this.setLocation}
                >
                  <FontAwesomeIcon icon="map-marker-alt" />
                </button>
              </div>
            </div>
            <div id="botonera-profile">
              <button
                id={"back-button"}
                className={"profile-button"}
                onClick={this.goBack}
              >
                Back
              </button>
              <button
                id={"yellow-button"}
                className={"profile-button"}
                onClick={this.saveInfo}
              >
                Save
              </button>
            </div>
          </div>
        )}
        {this.renderRodal()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.userReducer.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUserInfo: user => dispatch(setUserInfo(user))
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(WithUser(EditProfile)));
