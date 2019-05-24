import "./styles/PendingReviews.scss";
import WithUser from '../helpers/WithUser';
import PendingReviewItem from '../components/PendingReviewItem';
import Rodal from "rodal";
import "../components/Rodal/rodalContentStyles.scss";
import {withRouter} from 'react-router-dom';
import { connect } from "react-redux";
import { setUserInfo } from "../redux/actions/userActions";

import DataService from "../services/DataService";

import React, { Component } from 'react'

class PendingReviews extends Component {
    constructor(props){
        super(props);
  
        this.state={
            reviews:[],
            loading:true,
            visible:false,
            medalsStudent:[],
            medalsTeacher:[]    
        }
    }
  
    cargarReviews = async() =>{
        let user=await DataService.getObject('users',this.props.userInfo.uid);
        this.setState({loading:false, reviews:user.reviewsPending});  
    }
  
    async componentDidMount(){

        let allMedals = await DataService.getMedals();
        let medalsStudent=[];
		
        let medalsTeacher=[];
		
        for(let i=0;i<allMedals.length; i++){
            if(allMedals[i].type==="student"){medalsStudent.push(allMedals[i])}
             else{medalsTeacher.push(allMedals[i])
            }
        }

          if(this.props.userInfo){
              await this.cargarReviews();
          }
        
        this.setState({medalsStudent,medalsTeacher});
    }
  
    async componentDidUpdate(prevProps,prevState){
        if(prevProps.userInfo ===null && this.props.userInfo!==null){
            // console.log(this.props.userInfo.name);
            await this.cargarReviews();
        }
    }  

    sendReview = async(index, classReview, userId, talentId, userValue,userComment,userMedals,talentValue,talentComment ) =>{
		// console.log("TCL: PendingReviews -> sendReview -> classReview, userId, talentId, userValue,userComment,userMedals,talentValue,talentComment", classReview, userId, talentId, userValue,userComment,userMedals,talentValue,talentComment)
        userValue = parseFloat(userValue);
		
        
        let user = await DataService.getObject('users',userId);
        let talent;
        
        if(classReview === "student"){
            user.reviewsStudent.push({comment:userComment, value:userValue});
            user.totalReviewStudent = user.totalReviewStudent + userValue;
            let newMedals=[];
            for(let i=0; i<userMedals.length;i++){
                let encontrado=false;
                for(let j=0;j<user.medalsStudent.length; j++){
                    
                    if(userMedals[i]===user.medalsStudent[j].idMedal){
                        encontrado=true;
                        user.medalsStudent[j].numMedals++;
                    }
                }
                if(!encontrado){newMedals.push({idMedal:userMedals[i],numMedals:1})}
            }
            newMedals.forEach((nMedal)=>{user.medalsStudent.push(nMedal)})
        }

        else{
            user.reviewsTeacher.push({comment:userComment, value:userValue});
            user.totalReviewTeacher = user.totalReviewTeacher + userValue;
            
            let newMedals=[];
            for(let i=0; i<userMedals.length;i++){
                let encontrado=false;
                
                for(let j=0;j<user.medalsTeacher.length; j++){
                    console.log("comparacion",userMedals[i],user.medalsTeacher[j].idMedal)
                    if(userMedals[i]===user.medalsTeacher[j].idMedal){
                        console.log("encontrado")
                        encontrado=true;
                        user.medalsTeacher[j].numMedals++;
                    }
                }
                if(!encontrado){newMedals.push({idMedal:userMedals[i],numMedals:1})}
            }

            newMedals.forEach((nMedal)=>{user.medalsTeacher.push(nMedal)})

            talent= await DataService.getObject("talents",talentId);

            talentValue = parseFloat(talentValue);
            talent.reviews.push({value:talentValue,comment:talentComment});
            talent.totalReview= talent.totalReview + talentValue;

            DataService.updateDetail("talents",talentId,talent);
        }

        let reviewsPending = this.state.reviews;
        reviewsPending.splice(index,1);

        await DataService.updateDetail("users",userId,user);
        await DataService.updateDetail("users",this.props.userInfo.uid,{reviewsPending:reviewsPending});
        this.setState({reviews:reviewsPending});

        let usuarioActualizado= this.props.userInfo;
        usuarioActualizado.reviewsPending = reviewsPending;
        this.props.setUserInfo(usuarioActualizado);
    }


  render() {
    let {medalsTeacher,medalsStudent} = this.state;
    if(this.state.reviews.length!==0){
        
        let reviews = this.state.reviews;

        return (
            <div><div>{"Pending reviews: " + reviews.length}</div>
            <div id="pending-reviews-container">
                {reviews.map((review,i)=>{
                    return <PendingReviewItem key={i+"pending"+reviews.length} index={i} review={review} metodoSend={this.sendReview}
                    medals={review.classReview==="teacher" ? medalsTeacher : medalsStudent} />
                })}        
               
               
            </div></div>
          )
    }
    else{return <div>No pending reviews loaded</div>}
    
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
  
  export default connect(mapStateToProps,mapDispatchToProps)(withRouter(WithUser(PendingReviews)));