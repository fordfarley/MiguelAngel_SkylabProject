import './index.scss';
import React, { Component } from 'react';
import ReviewStarsYellow from '../ReviewStars/ReviewStarsYellow';
import Rodal from "rodal";
import "../Rodal/rodalContentStyles.scss";
import DataService from "../../services/DataService";
import MedalAdd from "../MedalAdd";


// let medals=[{type:"teacher", name:"",description:""},
// {type:"teacher", name:"Funny",description:""},
// {type:"teacher", name:"Adapts to everything",description:""},
// {type:"teacher", name:"Don't look at the clock",description:""},
// {type:"teacher", name:"Good host",description:""},
// {type:"teacher", name:"Empathic",description:""},
// {type:"teacher", name:"Attend after hours",description:""},
// {type:"teacher", name:"Versatile explaining",description:""},
// {type:"student", name:"Always on time",description:""},
// {type:"student", name:"Listen carefully",description:""},
// {type:"student", name:"Works after hours",description:""},
// {type:"student", name:"Learns fast",description:""},
// {type:"student", name:"Adapts to everything",description:""},
// {type:"student", name:"Empathic",description:""},
// {type:"student", name:"Always curious",description:""},
// {type:"student", name:"Tenacious and persistent",description:""},
// {type:"student", name:"Funny",description:""}
// ]

// addMedalsToDb = () =>{
//     medals.forEach(async(medal,i)=>{
//         await DataService.addObjectWithoutId("medals",medal);
//     })

//   }






export default class PendingReviewItem extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       userValue:5.0,
       userComment:"The better has been...The worst has been",
       userMedals:[],
       userMedalsName:[],
       medals:this.props.medals,
       talentValue:5.0,
       talentComment:"I've learned a lot about...",

       visible:false
    }
  }
  
  componentDidUpdate(prevProps){
      if(prevProps.medals.length === 0 && this.props.medals !== 0){
        //   console.log("componentDidUpdate");
          this.setState({medals:this.props.medals});
      }
      
  }

  changeSelect = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  show = () =>{
      this.setState({visible:true});
  }

  hide = () =>{
      this.setState({visible:false})
  }

  cambiaEstado = (index) =>{
    //   let index= e.target.getAttribute("id");
    //   console.log(index);
      let {userMedals, userMedalsName, medals} = this.state;
      let uM = userMedals.slice();
      let uN = userMedalsName.slice();

      if(uM.indexOf(medals[index].id)<0){
        uM.push(medals[index].id);
        uN.push(medals[index].name);
      }else{
        let i=uM.indexOf(medals[index].id);  
        uM.splice(i,1);
        uN.splice(i,1);
      }


      this.setState({userMedals:uM,userMedalsName:uN});
  }

  sendReview = () =>{
        let {userValue,userComment,userMedals,talentValue,talentComment}=this.state;
        let tipo = this.props.review.classReview;
        let review=this.props.review;
        let userId;
        let talentId=0;

        if(tipo==="student"){
            userId=review.idStudent;
        }else{
            userId=review.idTeacher;
            talentId=review.idTalent;
        }

        let index=this.props.index;

        this.props.metodoSend(index, tipo, userId, talentId, userValue,userComment,userMedals,talentValue,talentComment);

  }

  

  render() {
    let tipo = this.props.review.classReview;
    let {userValue,userComment,userMedals, medals, talentValue,talentComment,visible}=this.state;
    
    return (
      <div className="pending-review-item">  
      <div className="pending-review-item-container">
            <div className="user-review-container">
                <div className="user-review-name">{tipo==="student" ? 
                            this.props.review.nameStudent : 
                            this.props.review.teacherName}</div>
            
            
                <ReviewStarsYellow valor={userValue} />
                <input type="range" onChange={this.changeSelect} 
                            name="userValue" className="review-range" 
                            min="0" max="5" step="0.5"
                            value={userValue}/>


                <div className="review-user-comment-container">
                    <div className="review-user-comment-title">
                        Comment your experience with <span>{tipo==="student" ? 
                                this.props.review.nameStudent : 
                                this.props.review.teacherName}</span>{" as a "+tipo+":"}</div>
                    <textarea className="review-user-comment" rows="7" cols="32" name="userComment" value={userComment} 
                              onChange={this.changeSelect}></textarea>
                
                </div>
                <div className="add-medals-button" onClick={this.show}>{"Add "+tipo+" medals"}</div> 
            </div>

            {tipo==="teacher" && 
                <div className="user-review-container">
                <div className="user-review-name">{this.props.review.talentName}</div>
            
            
                <ReviewStarsYellow valor={talentValue} />
                <input type="range" onChange={this.changeSelect} 
                            name="talentValue" className="review-range" 
                            min="0" max="5" step="0.5"
                            value={talentValue}/>


                <div className="review-user-comment-container">
                    <div className="review-user-comment-title">
                        Comment your experience:</div>
                    <textarea className="review-user-comment" rows="7" cols="32" name="talentComment" value={talentComment} 
                              onChange={this.changeSelect}></textarea>
                
                </div> 
            </div>         
        
            }

            <div className="add-medals-button yellow" onClick={this.sendReview}>Send Review</div>

      </div>

        <Rodal 
        className="rodal-div"
        customStyles={{backgroundColor:"#202D3F", color:"#F5F5F5",borderRadius:"25px"}}
        visible={visible}
        onClose={this.hide}
        width={250}
        height={380}
        animation={"slideUp"}
        >

        <div className="rodal-title">{tipo+" medals"}</div>
        <div className="review-available-medals">
            {medals.map((medal,i)=>{
                    
                    return <div key={i} onClick={()=>{this.cambiaEstado(i)}} className={userMedals.indexOf(medal.id)>=0 ? "added-medal":"not-added-medal"} >
                            <MedalAdd key={i} index={i}  size="s" name={medals[i].name} added={false} /></div>
                }
            )}
        
        </div>
        
        </Rodal>
    
    </div>
      
    )
  }
}
