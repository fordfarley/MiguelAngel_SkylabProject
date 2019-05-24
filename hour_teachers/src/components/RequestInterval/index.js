import React, { Component } from 'react';
import "./index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

let days=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

export default class RequestInterval extends Component {
  constructor(props) {
    super(props);

    this.state = {
      day: "Monday",
      daysIndex: 0,
      start: "10:00",
      end: "12:00",
      errorMessage:this.props.errorMessage
    };
  }

  componentDidUpdate(prevProps){
    if(prevProps.errorMessage !== this.props.errorMessage){
      this.setState({errorMessage:this.props.errorMessage});
    }
  }

  changeStart = (e) => {
    let {day,start,end} = this.state;
    start= e.target.value;
    this.props.cambiaRequest(this.props.index,day,start,end);
    this.setState({start});
  }

  changeEnd = (e) => {
    let {day,start,end} = this.state;
    end= e.target.value;
    this.props.cambiaRequest(this.props.index,day,start,end);
    this.setState({end});
  }

  prevDay = () =>{
    
    let {daysIndex,day,start,end} = this.state;
    daysIndex--;
    if(daysIndex<0){daysIndex=6};
    day=days[daysIndex];
    // console.log("prevDay",daysIndex,day);

    this.props.cambiaRequest(this.props.index,day,start,end);
    this.setState({day, daysIndex});
  }

  nextDay = () =>{
    
    let {daysIndex,day,start,end} = this.state;
    daysIndex++;
    if(daysIndex>6){daysIndex=0};
    day=days[daysIndex];
    // console.log("NextDay",daysIndex,day);

    this.props.cambiaRequest(this.props.index,day,start,end);
    this.setState({day, daysIndex});
  }

  borrarRequest = () =>{
    this.props.borrarRequest(this.props.index);
  }

  render() {
    let {day,start,end,errorMessage} = this.state;
    return (
        <div className={errorMessage ? "request-container-error" : "request-container"}>
                {this.props.index!==0 && <div className="request-close"><FontAwesomeIcon  onClick={this.borrarRequest} icon="times-circle" className="request-close-button"/></div>}
                <div className="day-container">
                    <button onClick={this.prevDay} className="day-button">{"<"}</button>
                    <div className="day-placer">{day}</div>
                    <button onClick={this.nextDay} className="day-button">{">"}</button>
                </div>
                <div className="hour-div">
                    <input onChange={this.changeStart} type="time" value={start}/>
                    <div className="tag-request">Start time</div>
                </div>
                <div className="hour-div">
                    <input onChange={this.changeEnd} type="time" value={end}/>
                    <div className="tag-request">End time</div>
                </div>
                <div className="request-error-message">{errorMessage}</div>
        </div>
    )
  }
}
