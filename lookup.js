//test
const IMG = require('./img.json')
export const lookUp = {
  "01": {
    sun: "sun",
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
    cloud: "cloud",
    "d": {
      bg: IMG.cloud
    },
    "n": {
      bg: IMG.moon
    }
  },
  "09": {
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
    cloud: "cloud",
    precip: "lightning",
    water: "bolt",
    bg: IMG.storm
  },
  "13": {
    cloud: "cloud",
    precip: "snow",
    water: "flake",
    bg: IMG.snow
  },
  "50": {
    cloud: "cloud",
    bg: IMG.mist
  }
}
