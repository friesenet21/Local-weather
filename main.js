import { lookUp } from "./lookup.js"

export const bg = (img) => {
  return {
    backgroundImage: 'url(' + img + ')',
    backgroundSize: 'cover',
    position: "absolute",
    width: "100%",
    top: "0",
    bottom: "0"
  }
},
convert = (info, value) => { //Toggle Fahrenheit or Celsius
  const num = info.temp,
    DOT = String.fromCharCode(176)
  return value ? Math.round(num) + " " + DOT + "C" : Math.round(num * 9 / 5 + 32) + " " + DOT + "F"
},
appData = (data, loc) => {
  const i = data.weather[0].icon, //api data
    x = lookUp[i.slice(0, 2)], // lookup weather icon
    y = x[i[2]] // lookup day or night
  return Object.assign(Object.assign(x, y), data.weather[0], data.main, loc) //merge relevant data into one object
},
getData = (url) => { //SRSLY only this much factoring?
  return fetch(url).then(response => {
    return response.json()
  })
},
msg = "network error: please try http"
