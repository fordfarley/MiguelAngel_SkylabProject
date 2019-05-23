import './index.scss';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React, { Component } from 'react'

export default class ContactCard extends Component {
  delete = () =>{
    this.props.metodoDelete(this.props.index);
  }

  render() {
    return (
      <div>
        <div id="contact-card-item">
        <div className="contact-user-name"> {this.props.contact.name}</div>
        <div className="contact-user-mail"><FontAwesomeIcon className="icon-contact-card" icon="envelope"/>{this.props.contact.mail}</div>
        <div className="contact-user-phone"><FontAwesomeIcon className="icon-contact-card" icon="mobile-alt" />{this.props.contact.phone}</div>
        <div className="delete-contact-button" onClick={this.delete}><FontAwesomeIcon className="icon-contact-trash" icon="trash-alt" /> </div>
        </div>    
      </div>
    )
  }
}

 

    
