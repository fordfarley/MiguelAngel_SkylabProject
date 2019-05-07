import './index.scss';
import ReviewStars from '../ReviewStars';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataService from '../../services/DataService';
import Medal from '../Medal';

import React, { Component } from 'react'


export default class TeacherInfo extends Component {
  constructor(props){
      super(props);

      this.state={
          teacher: null,
          medals: null,
          loading: true
      }
  }

  async componentDidMount(){
    const teacher = await DataService.getObject('users',this.props.id);
    // console.log("TCL: Talent -> componentDidMount -> teacher", teacher)
    const medals = [];
	    for(let i=0; i<4 && i<teacher.medalsTeacher.length; i++){
        let newMedal = await DataService.getObject('medals',teacher.medalsTeacher[i].idMedal);
        medals.push({name : newMedal.name, description : newMedal.description, number: teacher.medalsTeacher[i].numMedals});
    }

    // console.log("TCL: TeacherInfo -> componentDidMount -> medals", medals)
    const loading = false;
    this.setState({teacher,medals, loading});
  }

  render() {

    const {teacher,medals,loading} = this.state;
    

    return (
        <div>
        {loading && <div>Loading</div>}
        {!loading && (teacher ? <div id="teacher-info">
            <div id='teacher-header'>
                <img id="teacher-photo" src={teacher.photo} alt="profile teacher" />
                <div id='teacher-header-text'>
                    <div id="teacher-name">{teacher.name}</div>
                    <ReviewStars valor={(teacher.totalReviewTeacher/teacher.reviewsTeacher.length).toFixed(1)}></ReviewStars>
                    <div id="teacher-hosts"><span>{"Host classes: "}</span><span id="teacher-hosts-response">{teacher.hosts ? "yes" : "no"}</span></div>
                </div>
            </div>
            <div className="separador"></div>
            <div id="medals-div">
                {medals.map((med,i) =>{
                    return <Medal name={med.name} number={med.number} size={"s"}/>;
                    })
                }
                
            </div>
            
            <div id="reviews-comments">
                {teacher.reviewsTeacher.map((rev,i) =>{
                    return <div className="alumno-review">
                                <ReviewStars valor={rev.value}></ReviewStars>
                                <div className="comment">{rev.comment}</div>
                        </div>;
                })
                }
            </div>
            
        </div> : <div>No teacher results</div>)}
      </div>
    )
  }
}
