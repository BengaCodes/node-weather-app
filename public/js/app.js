const fetchPage = (location) => {
  try {
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
      response.json().then(({ location, forecastData, error }) => {
        if (error) {
          messageOne.textContent = error
        } else {
          messageOne.textContent = location
          messageTwo.textContent = `The weather is ${forecastData.forecast.weather_descriptions[0]}. The current temperature is ${forecastData.forecast.temperature} degrees and the chances of rain is ${forecastData.forecast.precip}%`
        }
      })
    })
  } catch (error) {
    console.log(error)
  }
}


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = ''
// messageTwo.textContent = ''


weatherForm.addEventListener('submit', e => {
  e.preventDefault()

  const location = search.value

  messageOne.textContent = 'Loading weather...'
  messageTwo.textContent = ''

  fetchPage(location)
})


