import React, { Component } from 'react'
import './index.scss';
import Rodal from 'rodal';
import '../Rodal/rodalContentStyles.scss';

export default class NavigationBar extends Component {
  constructor(props) {
    super(props);  
    this.state = { visible: false,
    email:"",
    pass:""
    };
}

onChangeEmail = (event) =>{
  this.setState({email:event.target.value});
}
onChangePass = (event) =>{
  this.setState({pass:event.target.value});
}

show = () => {
    this.setState({ visible: true, email:"",pass:""  });
}

hide = () => {
    this.setState({ visible: false});
}

  render() {
    const {visible,email,pass} = this.state;

    return (
      <div id='navBar'>
         <img id='logo-nav' src={require('../../img/HourLogo_(light).png')} alt="logo hour teachers" />
         
         {/* <button className="button-nav" type="button"><img src={require('../../img/search-icon.svg')} className="search-icon" alt="search-icon"/></button>
         <form><input id="search-bar" type="text"></input></form> */}
         
         <button id="login-button" onClick={this.show}>Login</button>
            <Rodal 
                  customStyles={{backgroundColor:"#202D3F", color:"#F5F5F5",borderRadius:"25px"}}
                  visible={visible}
                  onClose={this.hide}
                  width={250}
                  animation={"slideUp"}
                  className="rodal-div">
                  
                  <div className="rodal-title">Log in</div>
                  <input className="rodal-input-text" onChange={this.onChangeEmail} type="text" placeholder="e-mail" value={email}></input>
                  <input className="rodal-input-text" onChange={this.onChangePass} type="password" placeholder="password" value={pass}></input>
                  <button className="rodal-send-button">Send ></button>
            </Rodal>


      </div>
    )
  }
}
