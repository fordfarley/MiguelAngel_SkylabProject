import React from 'react';
import './App.scss';
import NavigationBar from './components/NavigationBar';
// import Home from './pages/Home';

//Imports relativos al Router de react_____________________________
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';

//Imports relativos a Redux________________________________________
import { connect } from 'react-redux';
import { setUserInfo } from './redux/actions/userActions';


//Imports servicios de la base de datos (Firebase)_________________
import AuthService from './services/AuthService';
import DataService from './services/DataService';

//Imports relativos a fontAwesomeIcons_____________________________
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faCheckSquare, faAngleDown, faAngleUp, faHeart, faMedal, faBriefcase, faGraduationCap, faSearch,
          faUser,faSlidersH, faEdit, faTrashAlt, faMapMarkerAlt, faMapPin, faPencilAlt, faStar} from '@fortawesome/free-solid-svg-icons';
library.add(fab, faCheckSquare, faAngleDown, faAngleUp,faHeart,faMedal,faBriefcase,faGraduationCap,faSearch,
          faUser,faSlidersH, faEdit, faTrashAlt, faMapMarkerAlt, faMapPin, faPencilAlt, faStar);


class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      loading: true,
      logged:false,

    }
  }

  componentDidMount() {
    
    //Establecemos un observer para detectar cambios en el Auth
    AuthService.registerAuthObserver(async (user) => {
      if (user) {
        console.log('User is signed in '+user.uid);
        const userDetail = await DataService.getObject('users', user.uid);
        // console.log(userDetail);

        if(userDetail) {
          this.props.setUserInfo(userDetail);
          this.setState({logged:true})
        } else {
          console.log("Waiting for userInfo");
        }
        
      } else {
        console.log('User is signed out')
        this.setState({logged:false});
      }
      this.setState({loading: false})
    })
  }

  render(){
    return (
      <div className="App">
        <Router>
          <NavigationBar></NavigationBar>
          <Routes />
        </Router>
      </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
