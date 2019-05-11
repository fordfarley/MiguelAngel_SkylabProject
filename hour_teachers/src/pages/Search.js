import {Link} from 'react-router-dom';
import Rodal from 'rodal';
import './styles/Search.scss';
import DataService from '../services/DataService';
import SearchService from '../services/SearchService';
import {withRouter} from 'react-router-dom';
import TalentResume from '../components/TalentResume';
import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";




let talent1 = {description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tincidunt leo tellus, ut pretium lacus venenatis quis. Duis sed ornare erat. Ut ac efficitur quam. Aliquam id justo dolor. Integer nec tortor vel urna ultrices bibendum. Donec sed nunc sed orci ornare pretium. Nulla id bibendum turpis. Integer lectus ante, lacinia in odio quis, dapibus volutpat dui. Morbi ut molestie libero. Duis consequat mattis auctor. In venenatis, augue eu faucibus iaculis, neque lorem volutpat nisl, a viverra mauris massa et libero. Curabitur ligula eros, hendrerit ac volutpat id, interdum non sapien. Quisque iaculis ut libero faucibus molestie. Ut venenatis nisl nisl. Nullam elementum nisi vel libero semper interdum vel rutrum neque. Curabitur maximus et nulla posuere sollicitudin. Duis sem lorem, blandit ac dolor non, maximus gravida justo.",
                img:"https://firebasestorage.googleapis.com/v0/b/web-hour-teachers.appspot.com/o/Talent-Design.jpg?alt=media&token=4907f082-89d7-4102-bb50-9431c8565919",
                name:"Dancing like a star",
                price:15.0,
                reviews:[{comment:"The best moves with Michael", value:5.0},{comment:"Oh yes", value:5.0},{comment:"It's awesome", value:4.2}],
                tags:["Dancing","Stars","Hip Hop","Business Dancing","Pro"],
                teacher:"t24EjF3RUilVCqL6bh7K",
                teacherName:"Michael Scott",
                totalReview:14.2
               }

export default class Search extends Component {
  constructor(props){
      super(props);

      this.state={
          talentList:[],
          searchResult:[],
          numResults:0,
          loading:true,
          filterVisible:false,
          priceValue:20
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

  

  redirect = (index) =>{
    let {searchResult} = this.state
    this.props.history.push('/talent/'+searchResult[index].id);
  }

  changeVisible = () =>{
      let {filterVisible}=this.state;
      this.setState({filterVisible:!filterVisible});
  }


//   ________________________________________________________________Esta no debe ir aquí....
  anadir = async () =>{
      await DataService.addObjectWithoutId("talents",talent1)
  }



  render() {
    const {searchResult,loading,numResults,filterVisible}=this.state;
    return (
      <div>
          {/* <button onClick={this.anadir}>Añadir</button> */}
          <div onClick={this.changeVisible} id="filter-bar">
               <div id='tags-filters'></div>
               <div><FontAwesomeIcon id="icon-filters" icon="sliders-h"/> </div>
          </div>
          {filterVisible && <div id='filter-menu'>
                
          </div>}
          <div><span>Search results: </span>{numResults}</div>
          {!loading && <div id="talents-div">
                              
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
