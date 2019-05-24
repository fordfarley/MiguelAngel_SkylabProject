import './styles/PrivateProfile.scss';
import React, { Component } from 'react';
import WithUser from '../helpers/WithUser';
import Map from '../components/Map';

class PrivateProfile extends Component {
  render() {
    return (
      <div>
        <Map/>
      </div>
    )
  }
}

export default WithUser(PrivateProfile);


