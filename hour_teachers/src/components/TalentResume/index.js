import './index.scss';
import ReviewStarsYellow from '../ReviewStars/ReviewStarsYellow';
import React from 'react'
import Tag from '../Tag';

export default function TalentResume(props) {

  let valoracion=props.talent.totalReview/props.talent.reviews.length;
  if(isNaN(valoracion)){
    valoracion=0;
  }

  //Renderizado de un talent de perfil
  if(!props.search){return (
    <div className="talent-resume">
        <img className="talent-img" src={props.talent.img} alt="talent description" />
        <div className="talent-name">{props.talent.name}</div>
        <div className="talent-reviews-price-div">
            <div className="talent-reviews"><ReviewStarsYellow valor={valoracion.toFixed(1)}/></div>
            <div className="talent-price">{props.talent.price+" €/h"}</div>
        </div>
        <div className="tags-title"> Tags:</div>
        <div className="talent-tags-div">
                {props.talent.tags.map((tag,i) =>{
                                 return <Tag key={i} tag={tag} />;
                                })
                }
        </div>
    </div>
  )}
  

  //Renderizado de un talent de search
  return (
    <div className="talent-search">
        <img className="talent-img" src={props.talent.img} alt="talent description" />
        <div className="talent-name">{props.talent.name}</div>
        <div className="talent-teacher">{props.talent.teacherName}</div>
        <div className="talent-reviews-price-div">
            <div className="talent-reviews"><ReviewStarsYellow valor={valoracion.toFixed(1)}/></div>
            <div className="talent-price">{props.talent.price+" €/h"}</div>
        </div>
    </div>
  )
}
