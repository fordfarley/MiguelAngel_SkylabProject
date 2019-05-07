import './index.scss';
import ReviewStarsYellow from '../ReviewStars/ReviewStarsYellow';
import React from 'react'
import Tag from '../Tag';

export default function TalentResume(props) {
  return (
    <div className="talent-resume">
        <img className="talent-img" src={props.talent.img} alt="talent description" />
        <div className="talent-name">{props.talent.name}</div>
        <div className="talent-reviews-price-div">
            <div className="talent-reviews"><ReviewStarsYellow valor={(props.talent.totalReview/props.talent.reviews.length).toFixed(1)}/></div>
            <div className="talent-price">{props.talent.price+" €/h"}</div>
        </div>
        <div className="tags-title"> Tags:</div>
        <div className="talent-tags-div">
                {props.talent.tags.map((tag,i) =>{
                                 return <Tag tag={tag} />;
                                })
                }
        </div>
    </div>
  )
}
