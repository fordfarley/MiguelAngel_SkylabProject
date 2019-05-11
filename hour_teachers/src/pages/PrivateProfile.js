import './styles/PrivateProfile.scss';
import React, { Component } from 'react';
import WithUser from '../helpers/WithUser';

class PrivateProfile extends Component {
  render() {
    console.log(this.props.userInfo);
    return (
      <div>
        
      </div>
    )
  }
}

export default WithUser(PrivateProfile);


