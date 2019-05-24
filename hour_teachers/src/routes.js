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
import Add_Edit_Talent from './pages/Add_Edit_Talent';
import MyTalents from './pages/MyTalents';
import FavoriteTalents from './pages/FavoriteTalents';
import EditRequest from './pages/EditRequest';
import EditLocation from './pages/EditLocation';
import MyRequests from './pages/MyRequests';
import PendingReviews from './pages/PendingReviews';
import MyContacts from './pages/MyContacts';



export default function Routes(props) {
  return (
    <Switch>
        <Route path="/search/:id" component={Search} />
        <Route path="/search/" component={Search} />
        <Route path="/profile/:id" component={Profile} />
        <Route path="/talent/:id" component={Talent} />
        <Route path="/userProfile" component={PrivateProfile} />
        <Route path="/editProfile" component={EditProfile} />
        <Route path="/editLocation" component={EditLocation} />
        <Route path="/editTalent/:id" component={Add_Edit_Talent} />
        <Route path="/editRequest/:id" component={EditRequest} />
        <Route path="/myTalents" component={MyTalents} />
        <Route path="/myContacts" component={MyContacts} />
        <Route path="/myRequests" component={MyRequests} />
        <Route path="/pendingReviews" component={PendingReviews} />
        <Route path="/favoriteTalents" component={FavoriteTalents} />
        <Route path="/" component={Home} />
    </Switch>
  )
}

