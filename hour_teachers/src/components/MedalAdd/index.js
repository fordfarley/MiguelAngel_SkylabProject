import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import React from 'react'

export default function Medal(props) {  
  return (
    <div className="medal-add-container">
                                <FontAwesomeIcon className={"medal-add-"+props.size} icon="medal"/>
                                <div className="medal-add-name">{props.name}</div>
                                {props.added && <FontAwesomeIcon className={"medal-delete-icon"} icon="times-circle" />}
    </div>
  )
}
