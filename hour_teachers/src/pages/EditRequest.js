import React, { Component } from "react";
import "./styles/EditRequest.scss";
import ReviewStars from "../components/ReviewStars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WithUser from '../helpers/WithUser';
import RequestInterval from '../components/RequestInterval';
import Rodal from "rodal";
import "../components/Rodal/rodalContentStyles.scss";
import {withRouter} from 'react-router-dom';

import DataService from "../services/DataService";

class EditRequest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      talent: null,
      loading: true,
      phone:"",
      mail:"",
      userId:"",
      userName:"",
      requestIntervals:[{day:"Monday",start:"10:00",end:"12:00"}],
      errorMessages:[""],
      someError:false,
      visible:false,
      errorRodal:""
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
  componentDidUpdate(prevProps,prevState){
    if(prevProps.userInfo === null && this.props.userInfo !== null){
        this.setStateUserInfo();
    }

    if(prevState.requestIntervals.length !== this.state.requestIntervals.length){
      this.checkRequests(this.state.requestIntervals);
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

  handlePlaceRequest = async (e) =>{
    e.preventDefault();
    if(this.state.mail === "" && this.state.phone ===""){
      this.setState({errorRodal:"Contact phone or mail required"})
    }else{

      let {talent, phone, mail, userName, requestIntervals, userId}=this.state;
      let newRequest = {status:"pending", idStudent:userId, idTeacher: talent.teacher, teacherName:talent.teacherName, talent: talent.name, 
                        talentId:this.props.match.params.id, contact:{phone,mail,name:userName}, intervals:requestIntervals};
      
      //Añadimos la request al student
      // let student= await DataService.getObject('users',userId);
      // let stRequests = student.requests.slice();
      // stRequests.push(newRequest);
      // await DataService.updateDetail('users',userId,{requests:stRequests});

      //Añadimos la request al teacher
      let teacher= await DataService.getObject('users',talent.teacher);
      let tRequests = teacher.requests.slice();
      tRequests.push(newRequest);
      await DataService.updateDetail('users',talent.teacher,{requests:tRequests});
      
      this.setState({errorRodal:"Saved successfully"});
      setTimeout(()=>{this.props.history.push("/search/")},2000);

    }

  }


  onChangeInput = (e) => {
    this.setState({[e.target.name]: e.target.value, errorRodal:""})
  }

  showRodal = () =>{
    this.setState({visible:true});
  }

  hideRodal = () =>{
    this.setState({visible:false});
  }

  checkRequests=(intervals)=>{
    // Reseteamos los errores
    let errMes = intervals.map(()=>{return ""});
    let someError = false;
    
    // Recorremos todos los intervalos activos
    for(let index=0; index<intervals.length;index++){
        errMes[index]="";

        //Comprobamos que el intervalo en sí mismo sea válido
        let actual=intervals[index];
        if(actual.start>=actual.end){
            errMes[index]="End time must be greater than start time";
            someError=true;
        }

        //En caso de que el intervalo sea válido comprobamos que no se solapa con el resto de intervalos.
        else{
            // eslint-disable-next-line no-loop-func
            intervals.forEach((inter,i)=>{
                // Si el intervalo con el que comparamos no tiene error ya y no es él mismo...
                if(errMes[i]!=="End time must be greater than start time" && index!==i){
                    // Se solapan solo si son del mismo día
                    if(inter.day === actual.day){
                        if((actual.start>=inter.start && actual.start<inter.end) ||
                           (actual.end>inter.start && actual.end<=inter.end)){
                                errMes[index]="Overlapping intervals";
                                someError=true;
                                errMes[i]="Overlapping intervals";
                           }
                    }
                }
            })
        }
    }

    this.setState({errorMessages:errMes,someError});

  }

  cambiaRequest=(index, day, start, end)=>{
    // console.log("cambiaRequest", index, day, daysIndex, start, end);
    let {requestIntervals}=this.state;
    let rI = requestIntervals.slice();
    rI[index].day = day;
    rI[index].start = start;
    rI[index].end=end;
    // console.log("cambiaRequest", rI);
    this.checkRequests(rI);


    this.setState({requestIntervals:rI});
  }

  borrarRequest = (index) =>{
    let {requestIntervals, errorMessages}=this.state;
    let rI = requestIntervals.slice();
    let eM = errorMessages.slice();

    rI.splice(index,1);
    eM.splice(index,1);

    this.setState({requestIntervals:rI, errorMessages:eM})
  }

  addRequest = () =>{
    let {requestIntervals, errorMessages}=this.state;
    let rI = requestIntervals.slice();
    let eM = errorMessages.slice();

    rI.push({day:"Monday",start:"10:00",end:"12:00"});
    eM.push("");

    this.setState({requestIntervals:rI, errorMessages:eM})
  }

  renderReviewPrice = () =>{
    let {talent}=this.state;
    let valoracion=talent.totalReview / talent.reviews.length;
    if(isNaN(valoracion)){valoracion=0}
    return (
      <div id="valorac-precio-request-edit">
          <div id="valorac-request-edit">
              <ReviewStars valor={(valoracion).toFixed(1)}/>
          </div>
          <div id="precio-request-edit">{talent.price + " €/h"}</div>
      </div>
    )
  }

  renderTalentInfo = () =>{
    let {talent} = this.state;
    return(
      <div id="talent-page-request-edit">
                {/* <div><img id="talent-image" src={talent.img} alt={talent.name + " img"} /></div> */}
                <div id="talent-name-request-edit"><h1 id="talent-name-h1-request-edit">{talent.name}</h1></div>
            
                <div id="talent-text-request-edit">
                    <div id="talent-info-request-edit">
                        <div id="teacher-name-request-edit">
                            {talent.teacherName}
                        </div>
                        {this.renderReviewPrice()}
                    </div> 
                </div> 
            
            </div>
    )

  }

  renderRodal = () =>{
    let {visible,phone,mail,userName,errorRodal}=this.state;

    return (
      <Rodal 
      className="rodal-div"
      customStyles={{backgroundColor:"#202D3F", color:"#F5F5F5",borderRadius:"25px"}}
      visible={visible}
      onClose={this.hideRodal}
      width={250}
      height={325}
      animation={"slideUp"}
      >

      <div className="rodal-title">Contact Card</div>
      <div id="request-rodal-username">{userName}</div>
      <form onSubmit={this.handlePlaceRequest}>
        <input className="rodal-input-text" name="mail" onChange={this.onChangeInput}
         type="text" placeholder="Contact Mail" value={mail}></input>
        <input className="rodal-input-text" name="phone" onChange={this.onChangeInput}
            type="text" placeholder="Contact phone" value={phone}>
        </input>
        <button className="rodal-send-button">Save request ></button>
      </form>
      <div className="rodal-error-message">{errorRodal}</div>
      </Rodal>


    );


  }
  
  //Método que se encarga del renderizado de la página.
  render() {
    let {talent, loading, requestIntervals, errorMessages,someError} = this.state;
    // console.log(this.props.userInfo);

    return (
        <div>
            {loading && <div>loading</div>}
            {!loading && (talent ? <div id="request-general-div">
                <div>{this.renderTalentInfo()}</div>
                <div id="request-intervals-div">{requestIntervals.map((interval,i)=>{
              
                    return <RequestInterval key={i} index={i} 
                            errorMessage={errorMessages[i]} 
                            cambiaRequest={this.cambiaRequest}
                            borrarRequest={this.borrarRequest}/>;
                })}</div>
                <div id="add-request-button-container">
                    <div onClick={this.addRequest} id="add-request-button">
                        <FontAwesomeIcon id="add-request-button-icon" icon="calendar-plus" />
                    </div>
                </div>
                <div id="send-request-button-div">
                        {!someError ? <div id="send-request-button" onClick={this.showRodal}>Complete request</div>
                        : <div id="send-request-button-disabled">Fix errors first</div>}
                </div>
            </div>
            :<div>No talent results</div>)}
            {this.renderRodal()}

            
      </div>
    );
  }
}

export default withRouter(WithUser(EditRequest));
