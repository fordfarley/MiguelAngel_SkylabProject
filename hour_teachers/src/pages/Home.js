import {Link} from 'react-router-dom';
import Rodal from 'rodal';
import './styles/Home.scss';
import '../components/Rodal/rodalContentStyles.scss';
import AuthService from '../services/AuthService';
import DataService from '../services/DataService';
import {withRouter} from 'react-router-dom';

// import '../components/Rodal/index.scss';
// import '~rodal/lib/rodal.css';

import React, { Component } from 'react'

class Home extends Component {
  constructor(props) {
    super(props);  
    this.state = { 
      visible: false,
      // username:"",
      mail: "",
      pass: "",
      errorMessage:""};
}

// onChangeName = (event) =>{
//   this.setState({username:event.target.value});
// }

onChangeEmail = (event) =>{
  this.setState({mail:event.target.value, errorMessage:""});
}
onChangePass = (event) =>{
  this.setState({pass:event.target.value, errorMessage:""});
}

show = () => {
    this.setState({ visible: true });
}

hide = () => {
    this.setState({ visible: false });
}




componentDidMount() {
  AuthService.registerAuthObserver(async (user) => {
    if (user) {
      // User is signed in.
      const {mail} = this.state;
      if(mail){
        const success = await DataService.addObjectWithId('users', user.uid, {mail, uid:user.uid});
        if(success) {
          // console.log("GUARDAR NUEVO USUARIO EN REDUX");
          this.props.history.push('/talent/1');
        }
      }
      
    } else {
      // console.log("OJO: no hay usuario")

    }
  })
}



handleSignUp = async (e) =>{
  e.preventDefault();
  let {mail, pass} = this.state;

  // this.setState({errorMessage: ''});

    if(!mail || !pass) {
      this.setState({errorMessage: 'Email y password necesarios para el registro'});
      return;
    }

    const error = await AuthService.signup(mail, pass);

    if(error) {
      this.setState({errorMessage: AuthService.getErrorMessage(error)});
    }

  this.setState({visible:false});
}

render() {
    const {visible,email,pass,errorMessage} = this.state;
    return (
        <div id="home-page">
            <div id="signin-block">
                <h2 id="signin-title">Get the right impulse</h2>
                <div id="signin-secondary">Learn everything. Learn everywhere.</div>
                <button id="signup-button" onClick={this.show}>Sign Up</button>
            </div>
            <Link to={`/talent/1`} className="active">Talent</Link>
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
                  <form onSubmit={this.handleSignUp}>
                    {/* <input className="rodal-input-text" onChange={this.onChangeName}
                     type="text" placeholder="userName" value={username}></input> */}
                    <input className="rodal-input-text"  
                        onChange={this.onChangeEmail}
                        type="text"
                        placeholder="e-mail"
                        value={email}
                        autoComplete="username">
                    </input>
                    <input className="rodal-input-text"
                        onChange={this.onChangePass}
                        type="password"
                        placeholder="password"
                        value={pass}
                        autoComplete="new-password">
                    </input>
                    <button className="rodal-send-button">Register ></button>
                  </form>
                  <div className="rodal-error-message">{errorMessage}</div>
            </Rodal>
        </div>
    )
}
}

export default withRouter(Home);