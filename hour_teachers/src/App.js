import React from 'react';
import './App.scss';
import NavigationBar from './components/NavigationBar';

//Imports relativos al Router de react_____________________________
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';

//Imports relativos a Redux________________________________________
// import { connect } from 'react-redux';
// import { setUserInfo } from './redux/actions/userActions';

//Imports servicios de la base de datos (Firebase)_________________
import AuthService from './services/AuthService';
import DataService from './services/DataService';

//Imports relativos a fontAwesomeIcons_____________________________
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faCheckSquare, faAngleDown, faAngleUp, faHeart, faMedal, faBriefcase, faGraduationCap} from '@fortawesome/free-solid-svg-icons';
library.add(fab, faCheckSquare, faAngleDown, faAngleUp,faHeart,faMedal,faBriefcase,faGraduationCap);

function App() {
  return (
    <div className="App">
      <Router>
        <NavigationBar></NavigationBar>
        <Routes />
      </Router>
    </div>
  );
}

export default App;
