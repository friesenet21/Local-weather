getLoc()

function getLoc() {
fetch('http://ip-api.com/json', {
 method: "get"
}).then(response => {
 return response.json()
}).then(loc => {
 getWeather(loc)
})
}

function getWeather(loc, time) {
const lat = loc.lat,
 lon = loc.lon
fetch('http://api.openweathermap.org/data/2.5/weather?appid=ef38f527af7d31b986748fa3d1d57c89&units=metric&lat=' + lat + "&lon=" + lon, {
 method: "get"
}).then(response => {
 return response.json()
}).then(data => {
 //console.log(loc)
 time = Date.now().toString().slice(0, -3)
 weatherId(data, loc, time)
})
}

function weatherId(data, loc, time) {
let x = data.weather[0].id,
 code = []
if (199 < x && x < 233 || 799 < x && x < 803 || 950 < x && x < 957) {
 code.push(0) //<Circle/>
   if (time > data.sys.sunrise || time > data.sys.sunset) {
     code.push(2) //<Day/>
   }
 if (199 < x && x < 233 || 899 < x && x < 903 || x == 781) {
   code.push(5) //<Lightning/>
 }if (299 < x && x < 531 || x == 701) {
   code.push(4) //<Rain/>
 }
 if (599 < x && x < 623 || x == 771) {
   code.push(6) //<Snow/>
 }
 if (902 < x && x < 905 || x != 800) {
   code.push(1) //<cloud/>
 }
 console.log(code)
}

var App = React.createClass({
 getInitialState: function() {
   return ({
     ipLoc: '',
     weatherMap: ''
   })
 },
 componentDidMount: function() {

 },
 componentWillUnmount: function() {

 },
 render: function() {
   return (
     <div></div>
   )
 }
})
var Cloud = React.createClass({
 render: function() {
   return (
     <div>
   <div className ="cloud"></div>
   <div className ="cloud"></div>
     </div>
   )
 }
})
var Circle = React.createClass({
 render: function() {
   return (
     <div className="sun"></div>
   )
 }
})
var Lightning = React.createClass({
 render: function() {
   return (
     <div className="lightning">
 <div className="bolt"></div>
     <div className="bolt"></div>
</div>
   )
 }
})
var Snow = React.createClass({
 render: function() {
   return (
     <div className="snow">
 <div className="flake"></div>
     <div className="flake"></div>
</div>
   )
 }
})
var Rain = React.createClass({
 render: function() {
   return (
     <div className="rain">
</div>
   )
 }
})

ReactDOM.render(<App />, document.querySelector("#main"))
