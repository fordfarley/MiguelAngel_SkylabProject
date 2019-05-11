import {withRouter} from 'react-router-dom';
import WithUser from '../helpers/WithUser';
import './styles/EditProfile.scss';

import { connect } from 'react-redux';
import { setUserInfo } from '../redux/actions/userActions';


import React, { Component } from 'react'

class EditProfile extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      userName:""
    };
}

onChangeInput = (e) => {
  this.setState({[e.target.name]: e.target.value})
}

render() {
    
    return (
        <div id="home-page">
            {this.props.userInfo && <div>{this.props.userInfo.name}</div>}
            
        </div>
    )
}
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userReducer.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUserInfo: (user) => dispatch(setUserInfo(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WithUser(EditProfile)));
