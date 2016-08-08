const IMG = {
    sun: "http://s26.postimg.org/gqvpj3ja1/sunny_pic_8.jpg",
    cloud: "http://s26.postimg.org/75252ss49/Overcast_sky.jpg",
    stars: "http://s26.postimg.org/p2rgkcgnt/maxresdefault.jpg",
    moon: "http://s26.postimg.org/lbmhbrsd5/maxresdefault.jpg",
    storm: "http://s26.postimg.org/tyv3c1gt5/905088_thunderstorm_wallpaper.jpg",
    rain: "http://s26.postimg.org/ca3ckf521/HD_Rain_Wallpapers_1080p_7.jpg",
    snow: "http://s26.postimg.org/l8y0b6zbt/snow_falls.gif",
    mist: "http://s26.postimg.org/d4uhk72ah/6858993_lake_mist.jpg"
  },
  LOOKUP = {
    "01": {
      sun: "sun",
      cloud: null,
      "d": {
        rays: "rays",
        bg: IMG.sun
      },
      "n": {
        bg: IMG.stars
      }
    },
    "02": {
      sun: "sun",
      cloud: "cloud",
      "d": {
        rays: "rays",
        bg: IMG.sun
      },
      "n": {
        bg: IMG.moon
      }
    },
    "03": {
      sun: "sun",
      cloud: "cloud",
      "d": {
        rays: "rays",
        bg: IMG.cloud
      },
      "n": {
        bg: IMG.moon
      },
    },
    "04": {
      sun: null,
      cloud: "cloud",
      "d": {
        rays: null,
        bg: IMG.cloud
      },
      "n": {
        bg: IMG.moon
      }
    },
    "09": {
      sun: null,
      cloud: "cloud",
      rain: "rain",
      bg: IMG.rain

    },
    "10": {
      sun: "sun",
      cloud: "cloud",
      precip: "rain",
      bg: IMG.rain,
      "d": {
        rays: "rays"
      }
    },
    "11": {
      sun: null,
      cloud: "cloud",
      precip: "lightning",
      water: "bolt",
      bg: IMG.storm
    },
    "13": {
      sun: null,
      cloud: "cloud",
      precip: "snow",
      water: "flake",
      bg: IMG.snow
    },
    "50": {
      sun: null,
      cloud: "cloud",
      bg: IMG.mist
    }
  },
  BG = (img) => {
    return {
      backgroundImage: 'url(' + img + ')',
      backgroundSize: 'cover',
      position: "absolute",
      width: "100%",
      top: "0",
      bottom: "0"
    }
  },
  CONVERT = (info, value) => { //Toggle Fahrenheit or Celsius
    const num = info.temp,
      DOT = String.fromCharCode(176)
    return value ? Math.round(num) + " " + DOT + "C" : Math.round(num * 9 / 5 + 32) + " " + DOT + "F"
  },
  APPDATA = (data, loc) => {
    const i = data.weather[0].icon, //api data
      x = LOOKUP[i.slice(0, 2)], // lookup weather icon
      y = x[i[2]] // lookup day or night
    return Object.assign(Object.assign(x, y), data.weather[0], data.main, loc) //merge relevant data into one object
  },
  GETDATA = (url) => { //SRSLY only this much factoring?
    return fetch(url).then(response => {
      return response.json()
    })
  },
  MSG = "network error: please try http"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      main: [],
      err: ""
    }
  }
  componentDidMount = () => {
    GETDATA(this.props.ip).then(loc => {
      //console.log(loc)
      GETDATA(this.props.weather + loc.lat + "&lon=" + loc.lon).then(data => {
        this.setState({
          main: APPDATA(data, loc)
        })
      })
    }).catch(err => this.setState({
      main: MSG
    }))
  };
  render() {
    const data = this.state.main
    console.log(data)
    return (
      <div style = {BG(data.bg)}>
        <div className ="main">
        <div className ="city">
          <Text text ={data}/>
        </div>
        <div className ="icon">
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
      temp = CONVERT(info, value)
    return (
      <div>
      <h1>{info.city}<br/>{info.country}</h1>
      <h1 className="riobtn" onClick={this.handleClick}>{temp}</h1>
        <h1>{info.description}</h1>
        </div>)
  }
}

ReactDOM.render(<App ip = 'http://ip-api.com/json' weather = 'http://api.openweathermap.org/data/2.5/weather?appid=b2a6681590bccccae332ee769dd2826b&units=metric&lat=' credit = "http://codepen.io/joshbader/pen/EjXgqr"/>, document.querySelector("#app"))
