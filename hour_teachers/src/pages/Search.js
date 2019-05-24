import './styles/Search.scss';
import DataService from '../services/DataService';
import SearchService from '../services/SearchService';
import {withRouter} from 'react-router-dom';
import WithUser from '../helpers/WithUser';
import TalentResume from '../components/TalentResume';
import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";




// let talent1 = {description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tincidunt leo tellus, ut pretium lacus venenatis quis. Duis sed ornare erat. Ut ac efficitur quam. Aliquam id justo dolor. Integer nec tortor vel urna ultrices bibendum. Donec sed nunc sed orci ornare pretium. Nulla id bibendum turpis. Integer lectus ante, lacinia in odio quis, dapibus volutpat dui. Morbi ut molestie libero. Duis consequat mattis auctor. In venenatis, augue eu faucibus iaculis, neque lorem volutpat nisl, a viverra mauris massa et libero. Curabitur ligula eros, hendrerit ac volutpat id, interdum non sapien. Quisque iaculis ut libero faucibus molestie. Ut venenatis nisl nisl. Nullam elementum nisi vel libero semper interdum vel rutrum neque. Curabitur maximus et nulla posuere sollicitudin. Duis sem lorem, blandit ac dolor non, maximus gravida justo.",
//                 img:"https://firebasestorage.googleapis.com/v0/b/web-hour-teachers.appspot.com/o/Talent-Design.jpg?alt=media&token=4907f082-89d7-4102-bb50-9431c8565919",
//                 name:"Dancing like a star",
//                 price:15.0,
//                 reviews:[{comment:"The best moves with Michael", value:5.0},{comment:"Oh yes", value:5.0},{comment:"It's awesome", value:4.2}],
//                 tags:["Dancing","Stars","Hip Hop","Business Dancing","Pro"],
//                 teacher:"t24EjF3RUilVCqL6bh7K",
//                 teacherName:"Michael Scott",
//                 totalReview:14.2
//                }

class Search extends Component {
  constructor(props){
      super(props);

      this.state={
          talentList:[],
          searchResult:[],
          numResults:0,
          loading:true,
          locationDisabled:true,
          filterVisible:false,
          priceValue:20,
          orderPrice:"disabled",
          orderReview:"disabled",
          maxPrice:"150",
          minReviews:"0",
          maxDistance:"150"
      }
  }

  async componentDidMount(){
        const talentList = await DataService.getTalents();
        if(this.props.match.params.id){
        let searchResult=SearchService.searchTheWords(talentList,this.props.match.params.id.toLowerCase());
        this.setState({talentList, searchResult,loading:false, numResults:searchResult.length});}

        else{
            this.setState({talentList, searchResult:talentList,loading:false, numResults:talentList.length});
        }
        
  }

  changeSelect = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }
  

  redirect = (index) =>{
    let {searchResult} = this.state
    this.props.history.push('/talent/'+searchResult[index].id);
  }

  changeVisible = () =>{
      let {filterVisible}=this.state;
      let locationDisabled=true;
      if(this.props.userInfo){
         if(this.props.userInfo.location !==null){
            locationDisabled=false;
         }
      }
      this.setState({filterVisible:!filterVisible, locationDisabled});
  }

  applyFilters = () =>{
      let {talentList,orderPrice, orderReview, maxPrice, minReviews, maxDistance}=this.state;

      this.setState({loading:true});
      let location={lat:0,long:0};
      let useLocation=false;
      let searchResult=[];

      if(this.props.userInfo){
          location=this.props.userInfo.location;
          useLocation=true;
      }

      if(this.props.match.params.id){
        let words=this.props.match.params.id;
        searchResult= SearchService.searchFiltered(words,true,talentList,maxPrice,orderPrice,minReviews,orderReview,maxDistance,location,useLocation);
      } else{
        searchResult= SearchService.searchFiltered("",false,talentList,maxPrice,orderPrice,minReviews,orderReview,maxDistance,location,useLocation);
      } 

      let numResults=searchResult.length;
      this.setState({searchResult, numResults, loading:false, filterVisible:false});
  }


  render() {
    // console.log("Estado",this.state);
    const {searchResult,loading,numResults,filterVisible,maxPrice,minReviews,maxDistance,locationDisabled}=this.state;
    return (
      <div>
          <div onClick={this.changeVisible} id="filter-bar">
               <div id='tags-filters'></div>
               <div><FontAwesomeIcon id="icon-filters" className={filterVisible ? 'activated' : 'non' } icon="sliders-h"/> </div>
          </div>
          <div id='filter-menu' className={filterVisible ? 'visible' : null }>
              <div className={"filter-field"}>
                  <div className="filter-tag">Order by price:</div>
                  <select onChange={this.changeSelect} name="orderPrice" className="filter-select">
                      <option className="filter-select-option" value="disabled">Disabled</option>
                      <option className="filter-select-option" value="ascend">Ascend.</option>
                      <option className="filter-select-option" value="descend">Descend.</option>
                  </select>
              </div>
              <div className={"filter-field"}>
                  <div><div className="filter-tag">Max. price:</div>
                  <div className="filter-tag-value">{maxPrice+" €/h"}</div>
                  </div>
                  <input type="range" onChange={this.changeSelect} 
                        name="maxPrice" className="filter-range" 
                        min="0" max="150" step="5"
                        value={maxPrice}/>
              </div>
              <div className={"filter-field"}>
                  <div className="filter-tag">Order by reviews:</div>
                  <select onChange={this.changeSelect} name="orderReview" className="filter-select">
                      <option className="filter-select-option" value="disabled">Disabled</option>
                      <option className="filter-select-option" value="ascend">Ascend.</option>
                      <option className="filter-select-option" value="descend">Descend.</option>
                  </select>
              </div>
              <div className={"filter-field"}>
                  <div><div className="filter-tag">Min. rating:</div>
                  <div className="filter-tag-value">{minReviews+" "}<FontAwesomeIcon icon="star" /></div>
                  </div>
                  <input type="range" onChange={this.changeSelect} 
                        name="minReviews" className="filter-range" 
                        min="0" max="5" step="0.5"
                        value={minReviews}/>
              </div>
              {!locationDisabled && <div className={"filter-field"}>
                  <div><div className="filter-tag">Max. distance:</div>
                  <div className="filter-tag-value">{maxDistance+" Km"}</div>
                  </div>
                  <input type="range" onChange={this.changeSelect} 
                        name="maxDistance" className="filter-range" 
                        min="0" max="150" step="5"
                        value={maxDistance}/>
              </div>}
              {locationDisabled && <div id="location-message">To use the location filter you must set a location for your profile</div>}
              <div><button onClick={this.applyFilters} id="apply-button">Apply</button></div>
          </div>
          
          {!loading && <div id="talents-div">
                              <div><span>Search results: </span>{numResults}</div>
                              {searchResult.map((talent,i) =>{
                                 return <div
                                            key={i}
                                            className="talent-link"
                                            onClick={()=>this.redirect(i)}>
                                                <TalentResume search={true} talent={talent}/>
                                        </div>;
                                })
                              }
                            
          </div>}
      </div>
    )
  }


}

export default withRouter(WithUser(Search));
