const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//Handlebars Render Routes
app.get('', (req, res)=>{
    res.render('index', {
        title:'Weather',
        name: 'Matthew C.'
    })
})

app.get('/about', (req, res)=>{
    res.render('about',{
        title:'About Me',
        name:'Matthew C.'
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        message:'',
        title:'Help',
        name:'Matthew C.'
    })
})

//app.com/weather
app.get('/weather', (req, res) =>{
    if(!req.query.address) {
        return res.send({
            error: 'Must provide address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
          return res.send({error})
        } 
        forecast(longitude, latitude, (error, forecastData) => {
          if (error) {
            return res.send({error})
          }
          res.send({
              forecast:forecastData,
              location,
              address: req.query.address

          })
      })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    console.log(req.query.search)
    res.send ({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        errorMsg:'Help article not found',
        title:'Help 404',
        name:'Matthew C.'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        errorMsg:'404 Page not found',
        title:'404',
        name:'Matthew C.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})