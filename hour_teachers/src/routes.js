// Este archivo me servirá para incializar las rutas de mi web,
// para usarlo lo haré llamándolo desde App (Madre de todo).
// Es un componente en toda regla

// Importamos las dependencias de react y router-dom
import React from 'react'
import {Route, Switch} from 'react-router-dom';

// Importamos todas aquellas páginas a las que queremos acceder
import Talent from './pages/Talent';
import Home from './pages/Home';
import Profile from './pages/Profile';
import PrivateProfile from './pages/PrivateProfile';
import EditProfile from './pages/EditProfile';
import Search from './pages/Search';



export default function Routes(props) {
  return (
    <Switch>
        <Route path="/search/:id" component={Search} />
        <Route path="/search/" component={Search} />
        <Route path="/profile/:id" component={Profile} />
        <Route path="/talent/:id" component={Talent} />
        <Route path="/userProfile" component={PrivateProfile} />
        <Route path="/editProfile" component={EditProfile} />
        <Route path="/" component={Home} />
    </Switch>
  )
}

