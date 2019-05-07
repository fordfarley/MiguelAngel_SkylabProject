import React, { Component } from "react";
import "./styles/Talent.scss";
import ReviewStars from "../components/ReviewStars";
import TeacherInfo from "../components/TeacherInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HashLink as Link } from "react-router-hash-link";

import DataService from "../services/DataService";

export default class Talent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      descriptionVisible: false,
      talent: null,
      loading: true
    };
  }

  async componentDidMount() {
    // const talent = await DataService.getObject("talents",this.props.match.params.id);
    const talent = await DataService.getObject("talents","8IRuwRo8ONpFBWK5JrH2");
    const loading = false;
    this.setState({ talent, loading });
  }

  changeVisible = () => {
    let { descriptionVisible } = this.state;
    descriptionVisible = !descriptionVisible;
    this.setState({ descriptionVisible });
  };

  clickTeacher = (idUser) =>{
    this.props.history.push('/profile/'+idUser);
  }

  render() {
    let { descriptionVisible, talent, loading } = this.state;

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
                    <div id="talent-desc-title" onClick={this.changeVisible}>
                        <span>Description</span>
                        {descriptionVisible && <FontAwesomeIcon icon="angle-up" />}
                        {!descriptionVisible && <FontAwesomeIcon icon="angle-down" />}
                    </div>
                    <hr />
                    {descriptionVisible && (
                        <div id="talent-desc">{talent.description}</div>
                    )}
                    <div id="valorac-precio">
                        <div id="valorac">
                        <ReviewStars
                            valor={(talent.totalReview / talent.reviews.length).toFixed(
                            1
                            )}
                        />
                        </div>
                        <div id="precio">{talent.price + " €/h"}</div>
                    </div>
                    <div id="request-fav-div">
                        <button id="request-button" type="button">
                        Place Request
                        </button>
                        <button id="fav-button" type="button">
                        <FontAwesomeIcon icon="heart" />
                        </button>
                    </div>
                    </div>
                    <div id="talent-teacher" onClick={()=>this.clickTeacher(talent.teacher)}>
                        <TeacherInfo id={talent.teacher} />
                    </div>
                </div>
            <div id="talent-reviews">
                <div id="talent-reviews-title">Talent Reviews</div>
                {talent.reviews.map((rev, i) => {
                return (
                    <div className="talent-review">
                    <ReviewStars valor={rev.value} />
                    <div className="comment">{rev.comment}</div>
                    </div>
                );
                })}
            </div>
            </div>
            :<div>No talent results</div>)}
      </div>
    );
  }
}
