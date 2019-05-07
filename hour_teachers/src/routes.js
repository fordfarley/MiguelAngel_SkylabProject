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



export default function Routes(props) {
  return (
    <Switch>
        <Route path="/profile/:id" component={Profile} />
        <Route path="/talent/:id" component={Talent} />
        <Route path="/" component={Home} />
    </Switch>
  )
}

