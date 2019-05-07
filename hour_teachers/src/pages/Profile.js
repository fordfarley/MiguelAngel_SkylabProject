import React, { Component } from "react";
import "./styles/Profile.scss";
import ProfileInfo from "../components/ProfileInfo";
import TalentResume from '../components/TalentResume';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HashLink as Link } from "react-router-hash-link";

import DataService from "../services/DataService";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
       profileVisible: "teacher",
       statusTeacherIcon: "active",
       statusStudentIcon:"inactive",
       medalsTeacher: null,
       medalsStudent: null,
       user: null,
       talents: null,
       loading: true

    };
  }

  //Accesos a la base de datos para obtener todos los datos del usuario
  async componentDidMount() {
    //Accedemos a la base de datos para conseguir el perfil del usuario
    // const user = await DataService.getObject("users",this.props.match.params.id);
    const user = await DataService.getObject("users","t24EjF3RUilVCqL6bh7K");
    const loading = false;

    //Accedemos a la base de datos para conseguir las medallas del usuario como profesor
    let medalsTeacher=[];
      for(let i=0;i<user.medalsTeacher.length;i++){
        let newMedal = await DataService.getObject('medals',user.medalsTeacher[i].idMedal);
        medalsTeacher.push({name : newMedal.name, description : newMedal.description, number: user.medalsTeacher[i].numMedals});
      }

    //Accedemos a la base de datos para conseguir las medallas del usuario como alumno
    let medalsStudent=[];
      for(let i=0;i<user.medalsStudent.length;i++){
        let newMedal = await DataService.getObject('medals',user.medalsStudent[i].idMedal);
        medalsStudent.push({name : newMedal.name, description : newMedal.description, number: user.medalsStudent[i].numMedals});
      }  

    //Accedemos a la base de datos para conseguir los talentos de este usuario 
    let talents=[];
    for(let i=0;i<user.talents.length;i++){
      let newTalent = await DataService.getObject('talents',user.talents[i]);
      talents.push(newTalent);
    }  

    //Guadamos toda la información que nos hemos traido en el estado
    this.setState({ user, loading, medalsTeacher, medalsStudent, talents });
  }

  //Esta función se usa para cambiar el tipo de perfil que estamos visualizando de un mismo user
  changeActiveProfile = (value) => {
    let { profileVisible,statusTeacherIcon,statusStudentIcon } = this.state;
   
    if(profileVisible === "teacher" && value==="student"){
        profileVisible="student";
        statusTeacherIcon="inactive";
        statusStudentIcon="active";
    }else if(profileVisible === "student" && value==="teacher"){
        profileVisible="teacher";
        statusTeacherIcon="active";
        statusStudentIcon="inactive";
    }

    this.setState({ profileVisible,statusTeacherIcon,statusStudentIcon });
  };

  //Esta función renderiza los botones y se encarga también de cambiar el perfil a mostrar
  renderButtonsProfile = () =>{
    let {statusStudentIcon, statusTeacherIcon} = this.state;

    return (
      <div id="buttons-profile">
        <div onClick={()=>this.changeActiveProfile('teacher')} className={"button-profile "+statusTeacherIcon}>
            <FontAwesomeIcon className={"icon-button"} icon="briefcase"/>
            <div className="label-icon-profile">Teacher</div>
        </div>
        <div onClick={()=>this.changeActiveProfile('student')} className={"button-profile "+statusStudentIcon}>
            <FontAwesomeIcon className="icon-button" icon="graduation-cap"/>
            <div className="label-icon-profile">Student</div>
        </div>
      </div>
    );
  }

  //Esta función renderiza una información u otra en función de qué perfil está seleccionado
  renderProfileInfo = () =>{
    let { profileVisible, 
      medalsTeacher,
      medalsStudent,
      user} 
      = this.state;

    if(profileVisible === "teacher"){
      return(
        <ProfileInfo 
          reviews={user.reviewsTeacher} 
          medals={medalsTeacher}
          totalReview={user.totalReviewTeacher}/>);
    }else if(profileVisible === "student"){
      return(
        <ProfileInfo 
          reviews={user.reviewsStudent} 
          medals={medalsStudent}
          totalReview={user.totalReviewStudent}/>
      )
    }  
  }

  //Redireccionamos al talent sobre el que el usuario hace click
  redirect = (index) =>{
    let {user} = this.state
    // console.log(user.talents[index]);
    this.props.history.push('/talent/'+user.talents[index]);
  }

  render() {
    let { 
          talents,
          user,
          loading } 
          = this.state;
    

    return (
        <div id="profile-page">
            {loading && <div>loading</div>}
            {!loading && <div>
                            <img id="user-photo" src={user.photo} alt="profile user" />
                            <h1 id="user-name">{user.name}</h1>

                            { //Botones de selección del tipo de perfil que veremos (teacher/student)
                              this.renderButtonsProfile()}

                            <Link id="link-talents" smooth to="#talents-div"><div>See talents ></div></Link>
                            
                            { //Muestra la información del perfil: Medallas y reviews de los users
                              this.renderProfileInfo()}

                            <div id="talents-div">
                              <div className="talents-title">Talents:</div>
                              {talents.map((talent,i) =>{
                                //  console.log(talent);
                                 return <div className="talent-link" onClick={()=>this.redirect(i)}><TalentResume talent={talent}/></div>;
                                })
                              }
                            
                            </div>
                         </div>}
        </div>
    );
  }
}
