const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const getweather = require('./utils/getweather')

const app = express()


// * Define paths for Express config 
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials') // * Path to the partials folder

app.set('view engine', 'hbs') // * Used to create dynamic templating by installing npm i hbs
app.set('views', viewsPath) // * Setup views location
hbs.registerPartials(partialPath)

app.use(express.static(publicDirectoryPath)) // * Setup static directory to serve

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App', 
    name: 'Benga Olasebikan'
  })
})

app.get('/contact', (req, res) => {
  res.render('contact', {
    message: 'Should you wish to get in touch with me, please use details below',
    contact: 'benga.olasebikan@gmail.com',
    linkedIn: 'Benga - LinkedIn',
    title: 'Contact',
    name: 'Benga Olasebikan'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Benga Olasebikan', 
    profession: 'Junior Web Developer'
  })
})

app.get('/Weather', (req, res) => {
  const address = req.query.address
  if (!address) {
    return res.send({
      error: 'You must provide a search address'
    })
  }

  
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error })
    }
    getweather(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      }
      res.send({
        forecastData,
        location,
        address
      })
    })
  })

  // res.send({
  //   forecastData
  // })
})

app.get('/products', (req, res) => {
  if (!req.query.key) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  console.log(req.query.key)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('errors', {
    message: 'Help article not found',
    name: 'Benga Olasebikan'
  })
})

app.get('*', (req, res) => {
  res.render('errors', {
    message: 'Page not found',
    name: 'Benga Olasebikan'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000')
})