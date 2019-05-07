import {Link} from 'react-router-dom';
import Rodal from 'rodal';
import './styles/Home.scss';
import '../components/Rodal/rodalContentStyles.scss';
// import '../components/Rodal/index.scss';

// import '~rodal/lib/rodal.css';

import React, { Component } from 'react'

export default class Home extends Component {
  constructor(props) {
    super(props);  
    this.state = { 
      visible: false,
      username:"",
      email: "",
      pass: "" };
}

onChangeName = (event) =>{
  this.setState({username:event.target.value});
}

onChangeEmail = (event) =>{
  this.setState({email:event.target.value});
}
onChangePass = (event) =>{
  this.setState({pass:event.target.value});
}

show = () => {
    this.setState({ visible: true });
}

hide = () => {
    this.setState({ visible: false });
}

render() {
    const {visible,email,pass,username} = this.state;
    return (
        <div id="home-page">
            <div id="signin-block">
                <h2 id="signin-title">Get the right impulse</h2>
                <div id="signin-secondary">Learn everything. Learn everywhere.</div>
                <button id="signup-button" onClick={this.show}>Sign Up</button>
            </div>
            <Link to={`/talent/1`} activeClassName="active">Talent</Link>
            <Rodal 
                  className="rodal-div"
                  customStyles={{backgroundColor:"#202D3F", color:"#F5F5F5",borderRadius:"25px"}}
                  visible={visible}
                  onClose={this.hide}
                  width={250}
                  height={325}
                  animation={"slideUp"}
                  >

                  <div className="rodal-title">Sign up</div>
                  <input className="rodal-input-text" onChange={this.onChangeName} type="text" placeholder="userName" value={username}></input>
                  <input className="rodal-input-text" onChange={this.onChangeEmail} type="text" placeholder="e-mail" value={email}></input>
                  <input className="rodal-input-text" onChange={this.onChangePass} type="password" placeholder="password" value={pass}></input>
                  <button className="rodal-send-button">Register ></button>
            </Rodal>
        </div>
    )
}
}
