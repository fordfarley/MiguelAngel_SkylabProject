import React, { Component } from "react";
import "./styles/EditRequest.scss";
import ReviewStars from "../components/ReviewStars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HashLink as Link } from "react-router-hash-link";
import WithUser from '../helpers/WithUser';

import DataService from "../services/DataService";

class Talent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      talent: null,
      loading: true,
      phone:"",
      mail:"",
      userId:"",
      userName:"",

    };
  }

  //Recopilamos toda la información del talent que nos pasan por la url y si tenemos información
  //de usuario comprobamos si lo tiene en su lista de favoritos o si es propietario de este talent.
  async componentDidMount() {
    const talent = await DataService.getObject("talents",this.props.match.params.id);
    const loading = false;

    if(this.props.userInfo){
        this.setStateUserInfo();
    }

    this.setState({talent, loading});
  }

  //Cuando la información de usuario se actualice, comprobamos si es de los favoritos y
  // si es propietario del talent en cuestión.
  componentDidUpdate(prevProps){
    if(prevProps.userInfo === null && this.props.userInfo !== null){
        this.setStateUserInfo();
    }
  }

  //Método que setea los valores del estado relativos a la info del usuario que hace la request.
  setStateUserInfo(){
    let phone,mail,userId,userName = "";
        
    phone= this.props.userInfo.phone;
    mail=this.props.userInfo.mail;
    userId=this.props.userInfo.uid;
    userName=this.props.userInfo.name;

    this.setState({phone, mail, userId, userName});
  }


  renderReviewPrice = () =>{
    let {talent}=this.state;
    return (
      <div id="valorac-precio">
          <div id="valorac">
              <ReviewStars valor={(talent.totalReview / talent.reviews.length).toFixed(1)}/>
          </div>
          <div id="precio">{talent.price + " €/h"}</div>
      </div>
    )
  }

  renderTalentInfo = () =>{
    let {talent} = this.state;
    return(
      <div id="talent-page">
                {/* <div><img id="talent-image" src={talent.img} alt={talent.name + " img"} /></div> */}
                <div id="talent-name"><h1 id="talent-name-h1">{talent.name}</h1></div>
            
                <div id="talent-text">
                    <div id="talent-info">
                        <div id="teacher-name">
                            {talent.teacherName}
                        </div>
                        {this.renderReviewPrice()}
                    </div> 
                </div> 
            
            </div>
    )

  }

  
  //Método que se encarga del renderizado de la página.
  render() {
    let {talent, loading} = this.state;
    // console.log(this.props.userInfo);

    return (
        <div>
            {loading && <div>loading</div>}
            {!loading && (talent ? 
            <div>{this.renderTalentInfo()}</div>
            :<div>No talent results</div>)}

            <div className="request-container">
                <div className="day-container">
                    <button className="day-button">{"<"}</button>
                    <div className="day-placer">Day</div>
                    <button className="day-button">{">"}</button>
                </div>
                <div className="hour-div">
                    <input type="time"/>
                    <div className="tag-request">Start time</div>
                </div>
                <div className="hour-div">
                    <input type="time"/>
                    <div className="tag-request">End time</div>
                </div>
            </div>
      </div>
    );
  }
}

export default WithUser(Talent);
