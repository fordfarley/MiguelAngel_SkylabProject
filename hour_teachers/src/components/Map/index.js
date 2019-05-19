import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import DataService from '../../services/DataService';
import WithUser from '../../helpers/WithUser';
import {withRouter} from 'react-router-dom';
import './index.scss';
import Rodal from "rodal";
import "../Rodal/rodalContentStyles.scss";

import { connect } from "react-redux";
import {setUserInfo} from "../../redux/actions/userActions";


class Map extends Component {
  constructor(props){
      super(props);

      this.state={
          isSaved:false,
          visible:false,
          home: {
              lat:"",
              long:""
          }
      }
  }

  hide=()=>{
    this.props.history.push('/editProfile');
  }

  goBack = () =>{
    this.props.history.push("/editProfile");
  }

  handleSave = async (event) => {
    event.preventDefault();
    await DataService.updateDetail('users',this.props.userInfo.uid,{location:this.state.home});
    // this.props.home(this.props.user._id, this.state.home)
    // this.props.history.push('/editProfile');
    let user=this.props.userInfo;

    for(let i=0; i<user.talents.length;i++){
        DataService.updateDetail('talents',user.talents[i],{location:this.state.home});
    }

    user.location = this.state.home;
    this.props.setUserInfo(user);

    this.setState({visible:true});

  }
  
  componentDidMount() {
    
    const mapConfig = {
      container: 'map',
      style: 'mapbox://styles/fordfarley/cjvssufhf0ry91cqsw1d9k2lj',
      center: [-3.513590, 39.696967],
      zoom: 4.41,
    };
  
    mapboxgl.accessToken = 'pk.eyJ1IjoiZm9yZGZhcmxleSIsImEiOiJjanZzazlydXcwOTFjNDltaWt3MnZkdDZ5In0.o-ugMR7uV7IEmbUv7zDXHQ';
    
    this.map = new mapboxgl.Map(mapConfig);
  
    this.geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    });
  
    this.geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      placeholder: 'Add your address',
      marker:false
    })
    
    // this.map.addControl(this.geocoder);
    this.map.addControl(this.geocoder)
    
    this.map.on('load', () => {
      this.map.addSource('single-point', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: []
      }
    });
    this.map.addLayer({
      id: 'point',
      source: 'single-point',
      type: 'circle',
      paint: {
        'circle-radius': 10,
        'circle-color': '#448ee4'
      }
    });
    this.geocoder.on('result', (e) => {
      this.map.getSource('single-point').setData(e.result.geometry);
      this.setState({
        home: {
          lat: e.result.geometry.coordinates[0],
          long: e.result.geometry.coordinates[1],
        }
      })
    });
  });
  
  }
  
//   checkIfSaved = () => {
//     const {isSaved} = this.state
//     if (isSaved) {
//       return <Redirect to='/donate' /> 
//     } else {
//       return (  <div>
//         <div className ='map' id = 'map' ></div>
//         <p>asdsadasdasd</p>
//         <button className="map-button" onClick={this.handleSave}>Save</button>
  
//       </div>)
//     }
//   }
  
   render() {
       let {visible}=this.state;
       return(
       <div>
            <div className ='map' id = 'map' ></div>
            <div id="botonera-map">
              <button onClick={this.goBack} className="go-back-button">{"<"}</button>
              <button className="map-button" onClick={this.handleSave}>Save</button>
            </div>
            <Rodal
            customStyles={{
              backgroundColor: "#202D3F",
              color: "#F5F5F5",
              borderRadius: "25px"
            }}
            visible={visible}
            onClose={this.hide}
            width={250}
            height={140}
            animation={"slideUp"}
            className="rodal-div"
          >
            <div className="rodal-title">Location Saved</div>
            <button onClick={this.hide} className="rodal-send-button">Ok ></button>
          </Rodal>
        </div>)
   }
  
}

const mapStateToProps = state => {
  return {
    userInfo: state.userReducer.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUserInfo: user => dispatch(setUserInfo(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(WithUser(Map)));
