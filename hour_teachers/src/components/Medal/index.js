import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import React from 'react'

export default function Medal(props) {  
  return (
    <div className="medal-container">
                                <FontAwesomeIcon className={"medal-"+props.size} icon="medal"/>
                                <div className={"medal-info-"+props.size}>
                                    <div className="medal-name">{props.name}</div>
                                    <div className="medal-number">{props.number}</div>
                                </div>
    </div>
  )
}
