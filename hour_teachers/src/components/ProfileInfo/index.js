import './index.scss';
import ReviewStars from '../ReviewStars';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import Medal from '../Medal';
// import { HashLink as Link } from "react-router-hash-link";

export default class ProfileInfo extends Component {
  constructor(props){
      super(props)

      this.state ={
        visibleReviews: false,
        visibleMedals: false,
        numVisibleMedals: 0,
        numVisibleReviews:0
      }
  }
  
  changeMedals = () =>{
    let {visibleMedals,numVisibleMedals} = this.state;
    if(!visibleMedals){
        visibleMedals=!visibleMedals;
        numVisibleMedals=1000;
    }else{
        visibleMedals=!visibleMedals;
        numVisibleMedals=0;
    }

    this.setState({visibleMedals,numVisibleMedals});
  }

  changeReviews = () =>{
    let {visibleReviews,numVisibleReviews} = this.state;
    if(!visibleReviews){
        visibleReviews=!visibleReviews;
        numVisibleReviews=1000;
    }else{
        visibleReviews=!visibleReviews;
        numVisibleReviews=0;
    }

    this.setState({visibleReviews,numVisibleReviews});
  }
  
  render() {

    let {reviews, medals, totalReview}=this.props;
    let{numVisibleMedals,visibleMedals, numVisibleReviews, visibleReviews}=this.state;

    
    return (
      <div className="profile-info">
            <ReviewStars valor={(totalReview / reviews.length).toFixed(1)}/>
            <div>{medals.length>0 && <div id="medals-div">
                {medals.map((med,i) =>{
                    if(i<=numVisibleMedals){
                        return <Medal key={i} name={med.name} number={med.number} size={"s"}/>;
                    }
                    else{return <span key={i}></span>;}
                    })
                }
                
            </div>
            }
            {!visibleMedals && medals.length > 0 && <div onClick={this.changeMedals} className="link-styled">See all medals ></div>}
            {visibleMedals && medals.length > 0 && <div onClick={this.changeMedals} className="link-styled">See less medals ></div>}
            </div>
            {medals.length === 0 && <div id="medals-div">No medals in the hall</div>}

            <div>{reviews.length>0 && <div id="reviews-div">
                {reviews.map((rev,i) =>{
                    if(i<=numVisibleReviews){
                        return (<div key={i} className='review-div'>
                                    <ReviewStars valor={rev.value}/>
                                    <div>{rev.comment}</div>
                                </div>);
                    }
                    else{return <span key={i}></span>;}
                    })
                }
                
            </div>
            }
            {!visibleReviews && reviews.length > 0 && <div onClick={this.changeReviews} className="link-styled">See all Reviews ></div>}
            {visibleReviews && reviews.length > 0 && <div onClick={this.changeReviews} className="link-styled">See less Reviews ></div>}
            </div>
            {reviews.length === 0 && <div id="reviews-div">No reviews yet</div>}

      </div>
    )
  }
}
