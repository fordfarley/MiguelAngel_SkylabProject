import React, { Component } from 'react'
import TalentEditDelete from '../components/TalentEditDelete';
import DataService from '../services/DataService';
import WithUser from '../helpers/WithUser';
import './styles/MyTalents.scss';
import Rodal from "rodal";
import "../components/Rodal/rodalContentStyles.scss";

class MyTalents extends Component {
  constructor(props){
      super(props);

      this.state={
          loading:true,
          talents:[],
          talentsIds:[],
          visible:false
      }
  }

  hide = () =>{
      this.setState({visible:false});
  }

  cargarTalents = async() =>{
      let talentsIds = this.props.userInfo.talents;
      
      const promises=talentsIds.map((talent,i)=>{
         return DataService.getObject('talents',talent);
      })

      const talents=await Promise.all(promises);
      
      this.setState({loading:false, talents, talentsIds});
      
  }

  async componentDidMount(){
        if(this.props.userInfo){
            await this.cargarTalents();
        }
  }

  async componentDidUpdate(prevProps,prevState){
      if(prevProps.userInfo!==this.props.userInfo && this.props.userInfo && this.state.talents.length===0){
          console.log(this.props.userInfo.name);
          await this.cargarTalents();
      }
  }

  addTalent = () =>{
      this.props.history.push('/editTalent/0');
  }

  deleteTalent = async(talentId) =>{

       let {talentsIds,talents}=this.state;
       let index=talentsIds.indexOf(talentId);
       
      talentsIds.splice(index,1);
      await DataService.updateDetail('users',this.props.userInfo.uid,{talents:talentsIds});
      await DataService.deleteObject("talents",talentId);
      talents.splice(index,1);

      this.setState({talents,talentsIds,visible:true});
      console.log("Deleted",talentId);

  }

  render() {
    let {loading, talents, visible, talentsIds}=this.state;
    // console.log("talents",talents);
    return (
      <div id='mytalents-div'>
        <div id="container-button"><div onClick={this.addTalent} id="button-add"><div id="icon-add">+</div>Add a talent</div></div>
        {loading && <div>Loading</div>}
        {!loading && <div id="talents-div-2">{talents.map((talent,i)=>{
                return <TalentEditDelete key={i} talent={talent} metodoDelete={this.deleteTalent} talentId={talentsIds[i]} />
        })}</div>

        }

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
            <div className="rodal-title">Deleted Succesfully!</div>
            <button onClick={this.hide} className="rodal-send-button">Ok</button>
          </Rodal>
          {!loading && talents.length===0 && <div id="error-div">No talents added yet</div>}
      </div>
    )
  }
}

export default WithUser(MyTalents);
