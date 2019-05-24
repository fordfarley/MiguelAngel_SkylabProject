import "./styles/MyRequests.scss";
import WithUser from '../helpers/WithUser';
import RequestResume from '../components/RequestResume';
import Rodal from "rodal";
import "../components/Rodal/rodalContentStyles.scss";
import {withRouter} from 'react-router-dom';
import { connect } from "react-redux";
import { setUserInfo } from "../redux/actions/userActions";

import DataService from "../services/DataService";
import React, { Component } from 'react'



class MyRequests extends Component {
    constructor(props){
        super(props);
  
        this.state={
            requests:[],
            loading:true,
            pending:true,
            visible:false,
            rodalMessage:""    
        }
    }
  
    cargarRequests = async() =>{
        let user=await DataService.getObject('users',this.props.userInfo.uid);
        this.setState({loading:false, requests:user.requests});
        
    }
  
    async componentDidMount(){
          if(this.props.userInfo){
              await this.cargarRequests();
          }
    }
  
    async componentDidUpdate(prevProps,prevState){
        if(prevProps.userInfo ===null && this.props.userInfo!==null){
            // console.log(this.props.userInfo.name);
            await this.cargarRequests();
        }
    }

    accept= async(index)=>{
        let user=await DataService.getObject('users',this.props.userInfo.uid);
        let {requests} = this.state;
        let reviewsPending = user.reviewsPending.slice();

        //Cambio el estado de la request y añado una review pendiente en el usuario
        //que la ha aceptado
        requests[index].status="accepted";
        reviewsPending.push({classReview:"student",idStudent:requests[index].idStudent, nameStudent:requests[index].contact.name});
        // console.log("probando el servicio con",this.props.userInfo.uid,requests,reviewsPending);
        await DataService.updateDetail('users',this.props.userInfo.uid,{requests,reviewsPending});
        user.requests = requests;
        user.reviewsPending = reviewsPending;
        this.props.setUserInfo(user);


        //Finalmente capto los datos del usuario que hizo la request y añado una
        //review pendientes en su cuenta de reviews pendientes.
        let student=await DataService.getObject('users',requests[index].idStudent);
        // console.log("idStudent",requests[index].idStudent,student.uid);
        let rPending=student.reviewsPending.slice();
        // console.log("pending Reviews Before saving",rPending);
        rPending.push({classReview:"teacher",idTeacher:requests[index].idTeacher,teacherName:requests[index].teacherName,
        idTalent:requests[index].talentId, talentName:requests[index].talent});
        // console.log("pending Reviews Before saving",rPending);
        await DataService.updateDetail('users',requests[index].idStudent,{reviewsPending:rPending});

        //Finalmente salvo el estado de las requests
        this.setState({requests, visible:true, rodalMessage:"Request Accepted"});
    }

    decline = async(index)=>{
        let requests = this.state.requests.slice();
        
        //Quito esta de la lista
        requests.splice(index,1);
        //Actualizo la db
        await DataService.updateDetail('users',this.props.userInfo.uid,{requests});

        //finalmente actualizo el estado
        this.setState({requests, visible:true, rodalMessage:"Request Deleted"});

    }

    addContact = async(index)=>{
        let user=await DataService.getObject('users',this.props.userInfo.uid);
        let {requests} = this.state;
        let contacts = user.contacts.slice();
        
        let exists=false; let indice=0;
        contacts.forEach((cont,i)=>{
            if(cont.name === requests[index].contact.name){
                exists=true; indice=i;
            }
        });

        //SI ya existía ese contacto actualizo el teléfono y mail
        if(exists){
            if(requests[index].contact.phone){
                contacts[indice].phone=requests[index].contact.phone;}
            if(requests[index].contact.mail){
                contacts[indice].mail=requests[index].contact.mail;
            }    
        //Si no existía lo añado a la lista de contactos    
        }else{
            contacts.push(requests[index].contact);
        }
        
        await DataService.updateDetail('users',this.props.userInfo.uid,{contacts});
        if(exists){this.setState({visible:true, rodalMessage:"Contact updated"})}
        else{this.setState({visible:true, rodalMessage:"Contact saved"})};

        user.contacts = contacts;
        this.props.setUserInfo(user);
    }

    hide=()=>{
        this.setState({visible:false})
    }


  render() {
    let {loading,requests,pending,visible,rodalMessage} = this.state;


    return (
      <div>
        {!loading && <div>
            <div>{"Requests number: "+requests.length}</div>
            <div id="botonera-requests-container">
                <div onClick={()=>this.setState({pending:true})} className={pending ? "button-profile-requests active":"button-profile-requests inactive"}>Pending</div>
                <div onClick={()=>this.setState({pending:false})} className={!pending ? "button-profile-requests active":"button-profile-requests inactive"}>Accepted</div>
            </div>
            
            {pending && <div className="pending-requests-container">
                {requests.map((req,i)=>{
                    if(req.status === "pending"){
                        return <RequestResume key={i} index={i} request={req} metodoAccept={this.accept} metodoDecline={this.decline}/>
                    }else{
                        return null;
                    }
                })}
            </div>}
        
            {!pending && <div className="accepted-requests-container">
                {requests.map((req,i)=>{
                    if(req.status === "accepted"){
                        return <RequestResume key={i} index={i} request={req} metodoAddContact={this.addContact} metodoDelete={this.decline}/>
                    }else{
                        return null;
                    }
                })}
            </div>}

            <Rodal
                customStyles={{
                backgroundColor: "#202D3F",
                color: "#F5F5F5",
                borderRadius: "25px"
                }}
                visible={visible}
                onClose={this.hide}
                width={250}
                height={140}
                animation={"slideUp"}
                className="rodal-div"
            >
                <div className="rodal-title">{rodalMessage}</div>
                <button onClick={this.hide} className="rodal-send-button">
                Ok >
                </button>
            </Rodal>

        </div>}
      </div>
    )
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
  
  export default connect(mapStateToProps,mapDispatchToProps)(withRouter(WithUser(MyRequests)));
