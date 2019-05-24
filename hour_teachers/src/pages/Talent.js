import React, { Component } from "react";
import "./styles/Talent.scss";
import ReviewStars from "../components/ReviewStars";
import TeacherInfo from "../components/TeacherInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HashLink as Link } from "react-router-hash-link";
import WithUser from '../helpers/WithUser';
import {withRouter} from 'react-router-dom';

import DataService from "../services/DataService";

class Talent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      descriptionVisible: false,
      talent: null,
      loading: true,
      favorite:false,
      owner:false
    };
  }

  //Recopilamos toda la información del talent que nos pasan por la url y si tenemos información
  //de usuario comprobamos si lo tiene en su lista de favoritos o si es propietario de este talent.
  async componentDidMount() {
    const talent = await DataService.getObject("talents",this.props.match.params.id);
    const loading = false;
    let favorite=false;
    let owner=false;

    if(this.props.userInfo){
        favorite= this.checkFavorite();
        owner=this.checkOwner();
    }

    this.setState({ talent, loading, favorite,owner });
  }

  //Cuando la información de usuario se actualice, comprobamos si es de los favoritos y
  // si es propietario del talent en cuestión.
  componentDidUpdate(prevProps){
    if(prevProps.userInfo === null && this.props.userInfo !== null){
        let favorite=false;
        let owner=false;

        if(this.props.userInfo){
            favorite= this.checkFavorite();
            owner=this.checkOwner();
        }

        this.setState({ favorite,owner });
    }

  }

  //Método que devuelve si el talent pertenece al usuario
  checkOwner(){
      return (this.props.userInfo.talents.includes(this.props.match.params.id));
  }

  //Método que devuelve si el talent está en la lista de favoritos de nuestro usuario.
  checkFavorite(){
      return (this.props.userInfo.favorites.includes(this.props.match.params.id));
  }

  //Método que cambia la visibilidad de la descripción (plegada / desplegada)
  changeVisible = () => {
    let { descriptionVisible } = this.state;
    descriptionVisible = !descriptionVisible;
    this.setState({ descriptionVisible });
  };

  //Método que nos redirecciona a la página del teacher de este talent.
  clickTeacher = (idUser) =>{
    this.props.history.push('/profile/'+idUser);
  }

  //Método que nos guarda este talent en la lista de favoritos del usuario logeado
  saveFavorite = async() =>{
      let {favorite} = this.state;
      let favorites = this.props.userInfo.favorites;
      if(!favorite){
          favorites.push(this.props.match.params.id);
          await DataService.updateDetail("users", this.props.userInfo.uid, {favorites});
      }else{
          favorites.splice(favorites.indexOf(this.props.match.params.id),1);
          await DataService.updateDetail("users", this.props.userInfo.uid, {favorites});
      }
      this.setState({favorite:!favorite});
  }

  placeRequest = () =>{
    this.props.history.push('/editRequest/'+this.props.match.params.id);
  }

  //Métodos de soporte para el render de la página_______________
  renderRequestFavButtons=()=>{
    let { favorite,owner } = this.state;

    return (
      <div id="request-fav-div">
        
        {!owner && <button onClick={this.placeRequest} id="request-button" type="button">Place Request</button>}

        {!favorite && !owner && <button onClick={this.saveFavorite} id="fav-button" type="button">
        <FontAwesomeIcon icon="heart" /></button>}
        
        {favorite && !owner && <button onClick={this.saveFavorite} style={{backgroundColor:"#71828C",color:"#202d3f"}} id="fav-button" type="button">
        <FontAwesomeIcon icon="heart" /></button>}
      </div>
    )
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

  renderReviews = () =>{
      let {talent}=this.state;
      return (
        <div id="talent-reviews">
                <div id="talent-reviews-title">Talent Reviews</div>
                {talent.reviews.map((rev, i) => {
                return (
                    <div key={i} className="talent-review">
                    <ReviewStars valor={rev.value} />
                    <div className="comment">{rev.comment}</div>
                    </div>
                );
                })}
            </div>
      )
  }

  renderDescription = () =>{
    let { descriptionVisible, talent} = this.state;

    if(descriptionVisible){
      return (<div>
                  <div id="talent-desc-title" onClick={this.changeVisible}>
                    <span>Description</span>
                    <FontAwesomeIcon icon="angle-up" />
                  </div>
                  <hr />
                  <div id="talent-desc">{talent.description}</div>
              </div>
      )
    }else{
      return (<div>
                  <div id="talent-desc-title" onClick={this.changeVisible}>
                    <span>Description</span>
                    <FontAwesomeIcon icon="angle-down" />
                  </div>
                  <hr />
              </div>
      )
    }

  }

  renderTeacherInfo = () =>{

      let {talent}=this.state;
      return(
        <div id="talent-teacher" onClick={()=>this.clickTeacher(talent.teacher)}>
                        <TeacherInfo id={talent.teacher} />
                    </div>
      )
  }
  //______________________________________________________________



  //Método que se encarga del renderizado de la página.
  render() {
    let {talent, loading} = this.state;
    // console.log(this.props.userInfo);

    return (
        <div>
            {loading && <div>loading</div>}
            {!loading && (talent ? 
            <div id="talent-page">
                <div><img id="talent-image" src={talent.img} alt={talent.name + " img"} /></div>
                <div id="talent-name"><h1 id="talent-name-h1">{talent.name}</h1></div>
            
                <div id="talent-text">
                    <div id="talent-info">
                        <div id="teacher-name">
                            <Link smooth to="#talent-teacher">
                            {talent.teacherName}
                            </Link>
                        </div>
                        {this.renderDescription()}
                        {this.renderReviewPrice()}
                        {this.renderRequestFavButtons()}
                        
                    </div>
                    {this.renderTeacherInfo()}
                    
                </div>
                {this.renderReviews()}    
            
            </div>
            :<div>No talent results</div>)}
      </div>
    );
  }
}

export default withRouter(WithUser(Talent));
