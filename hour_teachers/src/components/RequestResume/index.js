import React, { Component } from 'react';
import './index.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class RequestResume extends Component {

  accept= () =>{
    this.props.metodoAccept(this.props.index);
  }

  decline=()=>{
    this.props.metodoDecline(this.props.index);
  }

  addContact=()=>{
    this.props.metodoAddContact(this.props.index);
  }

  deleteRequest=()=>{
    this.props.metodoDelete(this.props.index);
  }

  render() {
    let request = this.props.request;
    let status = request.status;

    return (
      <div className="request-resume-item">
            <div className="req-talent-name">{request.talent}</div>
            <div className="interval-tags-container">
                {request.intervals.map((inter,i)=>{
                    return <span key={i} className="req-interval-tag">{inter.day+": "+inter.start+"-"+inter.end}</span>
                })}
            </div>
            <div className="req-contact-info">
                <div className="req-contact-info-field"><span className="contact-info-label">UserName: </span>{request.contact.name}</div>
                <div className="req-contact-info-field"><span className="contact-info-label">Phone: </span>{request.contact.phone}</div>
                <div className="req-contact-info-field"><span className="contact-info-label">Mail: </span>{request.contact.mail}</div>
            </div>
            <div className="botonera-req-resume">
                {status==="pending" && 
                    <div className="req-resume-left-button" onClick={this.accept}><FontAwesomeIcon icon="check-circle" /><div>Accept</div></div>
                }
                {status==="pending" && 
                    <div className="req-resume-right-button" onClick={this.decline}><FontAwesomeIcon icon="times-circle" /><div>Decline</div></div>
                }
                {status==="accepted" && 
                    <div className="req-resume-left-button" onClick={this.addContact}><FontAwesomeIcon icon="plus-circle" /><div>Add contact</div></div>
                }
                {status==="accepted" && 
                    <div className="req-resume-right-button" onClick={this.deleteRequest}><FontAwesomeIcon icon="times-circle" /><div>Delete</div></div>
                }
            
            </div>
      </div>
    )
  }
}
