const request = require('request')

const getWeather = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=a5c057e12ff8cbdb68edff5e211dd3ac&query=${latitude}, ${longitude}`

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect with Weather service!')
    } else if  (body.error) {
      callback('Unable to find location')
    } else {
      callback(undefined, {
        forecast: body.current
      })
    }
  })
}

module.exports = getWeather