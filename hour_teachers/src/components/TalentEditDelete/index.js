import './index.scss';
import ReviewStarsYellow from '../ReviewStars/ReviewStarsYellow';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';

class TalentEditDelete extends Component {
  edit = () =>{
    this.props.history.push('/editTalent/'+this.props.talentId);

  }

  delete = () =>{
    
   this.props.metodoDelete(this.props.talentId);
  }

  render() {

    let valoracion = this.props.talent.totalReview/this.props.talent.reviews.length
    if(isNaN(valoracion)){valoracion=0;}
    return (
      <div className="talent-resume">
        <img className="talent-img" src={this.props.talent.img} alt="talent description" />
        <div className="talent-name">{this.props.talent.name}</div>
        <div className="talent-reviews-price-div">
            <div className="talent-reviews"><ReviewStarsYellow valor={(valoracion).toFixed(1)}/></div>
            <div className="talent-price">{this.props.talent.price+" €/h"}</div>
        </div>
        <div className="talent-buttons-div">
             <button onClick={this.edit} className="boton-icono-izq"><FontAwesomeIcon className="icon-button" icon="edit" /></button>
             <button onClick={this.delete} className="boton-icono-der"><FontAwesomeIcon className="icon-button" icon="trash-alt" /></button>
        </div>
    </div>
    )
  }
}

export default withRouter(TalentEditDelete);

