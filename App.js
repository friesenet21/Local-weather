import React from 'react'
import './App.css'
import {bg, convert, appData, getData, msg} from './main.js'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      main: [],
      err: ""
    }
  }
  componentDidMount = () => {
    getData(this.props.ip).then(loc => {
      //console.log(loc)
      getData(this.props.weather + loc.lat + "&lon=" + loc.lon).then(data => {
        this.setState({
          main: appData(data, loc)
        })
      })
    }).catch(err => this.setState({
      main: msg
    }))
  };
  render() {
    const data = this.state.main
    console.log(data)
    return (
      <div style={bg(data.bg)}>
        <div className="main">
        <div className="city">
          <Text text={data}/>
        </div>
        <div className="icon">
          <Icon icon={data}/>
          <p>{data}</p>
        </div>
        </div>
        <p>Weather icons by<a href={this.props.credit}target="_blank"> Josh Bader</a></p>
      </div>)
  }
}

class Icon extends React.Component {
  render() {
    //empty objects creating error
    let icon = this.props.icon
    return (
      <div>
        <div className={icon.cloud}></div>
        <div className={icon.cloud}></div>
        <div className={icon.sun}>
          <div className={icon.rays}></div>
        </div>
        <div className={icon.precip}>
          <div className={icon.water}></div>
          <div className={icon.water}></div>
        </div>
       </div>)
  }
}

class Text extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      temp: true //starting value of temp
    }
  }
  handleClick = () => { //merging this component with class App forces componentDidMount to run onClick
    console.log('clicked');
    this.setState({
      temp: !this.state.temp
    })
  };
  render() {
    const info = this.props.text,
      value = this.state.temp,
      temp = convert(info, value)
    return (
      <div>
      <h1>{info.city}<br/>{info.country}</h1>
      <h1 className="riobtn" onClick={this.handleClick}>{temp}</h1>
        <h1>{info.description}</h1>
        </div>)
  }
}

export default App;
