import React, { Component } from 'react'
// import TalentEditDelete from '../components/TalentEditDelete';
import TalentResume from '../components/TalentResume';
import DataService from '../services/DataService';
import WithUser from '../helpers/WithUser';
// import './styles/MyTalents.scss';
import './styles/FavoriteTalents.scss';


class FavoriteTalents extends Component {
  constructor(props){
      super(props);

      this.state={
          loading:true,
          favorites:[],
          favoritesIds:[]
      }
  }


  cargarfavorites = async() =>{
    
      let favoritesIds = this.props.userInfo.favorites;
      // let favorites=[];

      const promises=favoritesIds.map((talent,i)=>{
        return DataService.getObject('talents',talent);
      })

      const favorites=await Promise.all(promises);

      // favoritesIds.forEach(async(talent,i)=>{
      //     let t= await DataService.getObject('talents',talent);
      //     console.log("object",t)
      //     favorites.push(t);
					
      // })

      console.log("TCL: FavoriteTalents -> cargarfavorites -> favorites", favorites)
      
      this.setState({loading:false, favorites, favoritesIds});
  }

  componentDidMount(){
        if(this.props.userInfo){
            console.log("Did mount",this.props.userInfo.favorites)
            this.cargarfavorites();
        }
  }

  componentDidUpdate(prevProps){
      if(prevProps.userInfo===null && this.props.userInfo!==null){
          console.log("Did update",this.props.userInfo);
          this.cargarfavorites();
      }
  }

  redirect = (index) =>{
    let {favoritesIds} = this.state
    // console.log(user.talents[index]);
    this.props.history.push('/talent/'+favoritesIds[index]);
  }

  render() {
    let {loading, favorites}=this.state;
    console.log("favorites",favorites.length);
    return (
      <div id='favtalents-div'>
        {!loading && favorites.length===0 && <div id="error-div">No favorite talents added!</div>}
        {loading && <div>Loading</div>}
        {!loading && <div><div>{"Favorite talents: "+ favorites.length}</div><div id="favtalents-div-2">{favorites.map((talent,i)=>{
                return <div key={i} className="talent-link" onClick={()=>this.redirect(i)}><TalentResume talent={talent}/></div>;
        })}</div></div>

        }
       
      </div>
    )
  }
}

export default WithUser(FavoriteTalents);
