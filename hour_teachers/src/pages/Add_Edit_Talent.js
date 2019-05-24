import { withRouter } from "react-router-dom";
import WithUser from "../helpers/WithUser";
import "./styles/Add_Edit_Talent.scss";
import Rodal from "rodal";
import "../components/Rodal/rodalContentStyles.scss";

import { connect } from "react-redux";
import { setUserInfo } from "../redux/actions/userActions";

import TagDelete from "../components/TagDelete";

import React, { Component } from "react";
import DataService from "../services/DataService";
import StorageService from "../services/StorageService";

// New Date()

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img:
        "https://firebasestorage.googleapis.com/v0/b/web-hour-teachers.appspot.com/o/talents-img%2FTalentDefault-17.jpg?alt=media&token=db2fa9d1-b234-406e-87e2-dd12639069ab",
      talentName: "",
      description: "",
      price: "",
      newTag: "",
      tags: [],
      errorMessage: "",
      visible: false
    };
  }

  async componentDidMount(){
    if (this.props.match.params.id !== "0"){
        let talent= await DataService.getObject('talents',this.props.match.params.id);
        this.setState({talentName:talent.name,
                       img:talent.img,
                       description:talent.description,
                       price:talent.price,
                       tags:talent.tags});
    }
  }

  onChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addTag = e => {
    e.preventDefault();
    let { tags, newTag } = this.state;

    if (!tags.includes(newTag) && tags.length < 10) {
      tags.push(newTag);
    }

    e.target.value = "";
    this.setState({ tags, newTag: "" });
  };

  deleteTag = tag => {
    let { tags } = this.state;
    tags.splice(tags.indexOf(tag), 1);
    this.setState({ tags });
  };

  discard = () => {
    this.props.history.goBack();
  };

  hide = () =>{
    this.props.history.goBack();
  }

  uploadPhoto = (e) =>{
    const file = e.target.files[0];
    if (file) {
      StorageService.uploadFile(file, "talents-img", imageUrl => {
        this.setState({ img: imageUrl });
      });
    }
  }

  saveTalent = async () => {
    let {talentName,description, price,tags,errorMessage,img} = this.state;

    if (!talentName || !description || !price) {
      errorMessage = "Talent name, description and price are required";
      this.setState({ errorMessage });
    } 
    else {
      
      //Caso en que queremos crear un nuevo talent para el usuario
      if (this.props.match.params.id === "0") {
        // console.log("Nuevo talent del usuario");
        let data = {
          description: description,
          price: parseFloat(price).toFixed(2),
          name: talentName,
          tags: tags,
          location: this.props.userInfo.location,
          teacher: this.props.userInfo.uid,
          teacherName: this.props.userInfo.name,
          img: img,
          reviews: [],
          totalReview: 0
        };

        
        await DataService.addTalent(
          data,
          this.props.userInfo.uid,
          this.props.userInfo.talents
        );

        this.setState({ visible: true });
      }else{

        //Caso en que queremos actualizar un talent de este usuario
          if(this.props.userInfo.talents.includes(this.props.match.params.id)){
            let data = {
              description: description,
              price: parseFloat(price).toFixed(2),
              name: talentName,
              tags: tags,
              img: img,
            };

            await DataService.updateDetail('talents',this.props.match.params.id,data);
            this.setState({ visible: true });
          }
      }
    }
  };

  render() {
    let {
      talentName,
      description,
      price,
      newTag,
      tags,
      errorMessage,
      visible,
      img
    } = this.state;
    return (
      <div id="home-page">
        <div id="edit-talent-img">
            <img id="current-talent-img" src={img} alt="profile user" />
            <input id="talent-file" type="file" onChange={this.uploadPhoto} />
            <div id="recomendation">Preferred size: 1920x650</div>
            <label
              id="label-file"
              className={"talent-button"}
              htmlFor="talent-file"
            >
              Edit photo
            </label>
        </div>
        <div id="talent-form">
          {this.props.userInfo && (
            <div className="input-field" id="teacher-name">
              <span>{"Teacher: "}</span>
              {this.props.userInfo.name}
            </div>
          )}
          <div className="input-field">
            <div>Talent Name:</div>
            <input
              className="input-area talent-name-field"
              onChange={this.onChangeInput}
              name="talentName"
              type="text"
              value={talentName}
            />
          </div>
          <div className="input-field">
            <div>Description:</div>
            <textarea
              className="input-area description-field"
              name="description"
              onChange={this.onChangeInput}
              value={description}
              type="text"
            />
          </div>
          <div className="input-field">
            <div>Price €/h:</div>
            <input
              className="input-area price-field"
              name="price"
              onChange={this.onChangeInput}
              type="number"
              value={price}
            />
          </div>
          <div className="input-field">
            <div>Tags:</div>
            <form onSubmit={this.addTag}>
              <input
                className="input-area tags-field"
                name="newTag"
                onChange={this.onChangeInput}
                value={newTag}
                type="text"
              />
              <button className="button-talent">Add</button>
            </form>
          </div>
          <div id="tags-area">
            {tags.map((tag, i) => {
              return (
                <TagDelete key={i} tag={tag} metodoDelete={this.deleteTag} />
              );
            })}
          </div>
          <div id="error-message">{errorMessage}</div>
          <div id="buttons">
            
            <button onClick={this.discard} className="button-talent">
              Discard
            </button>
            <button onClick={this.saveTalent} className="button-talent-yellow">
              Save
            </button>
          </div>
         
          <Rodal
            customStyles={{
              backgroundColor: "#202D3F",
              color: "#F5F5F5",
              borderRadius: "25px"
            }}
            visible={visible}
            onClose={this.hide}
            width={250}
            height={140}
            animation={"slideUp"}
            className="rodal-div"
          >
            <div className="rodal-title">Saved Succesfully!</div>
            <button onClick={this.hide} className="rodal-send-button">Ok</button>
          </Rodal>
        </div>
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
