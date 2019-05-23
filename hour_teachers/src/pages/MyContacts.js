import "./styles/MyContacts.scss";

import ReviewStars from "../components/ReviewStars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HashLink as Link } from "react-router-hash-link";
import WithUser from '../helpers/WithUser';
import RequestResume from '../components/RequestResume';
import Rodal from "rodal";
import "../components/Rodal/rodalContentStyles.scss";
import {withRouter} from 'react-router-dom';
import DataService from "../services/DataService";
import ContactCard from "../components/ContactCard";

import React, { Component } from 'react'

class MyContacts extends Component {
 
    constructor(props){
        super(props);
  
        this.state={
            contacts:[],
            loading:true,
            visible:false  
        }
    }

    cargarContacts = async() =>{
        let user=await DataService.getObject('users',this.props.userInfo.uid);
        this.setState({loading:false, contacts:user.contacts});
    }
  
    async componentDidMount(){
          if(this.props.userInfo){
              await this.cargarContacts();
          }
    }
  
    async componentDidUpdate(prevProps,prevState){
        if(prevProps.userInfo ===null && this.props.userInfo!==null){
            // console.log(this.props.userInfo.name);
            await this.cargarContacts();
        }
    }

    deleteContact = async(index) =>{
        let {contacts}= this.state;
        let contactsNew= contacts.slice();

        contactsNew.splice(index,1);
        await DataService.updateDetail("users",this.props.userInfo.uid,{contacts:contactsNew});
        this.setState({contacts:contactsNew});
    }


  render() {
      let {loading,contacts}=this.state;
    return (<div>
      {loading && <div>loading</div>}    
      {!loading && <div id="contacts-book">
         {contacts.map((contact,i)=>{
            return <ContactCard key={i} index={i} metodoDelete={this.deleteContact} contact={contact} />
         })}
      </div>}
      {!loading && contacts.length===0 && <div>Empty</div>}
      </div>
    )
  }
}

export default WithUser(MyContacts);