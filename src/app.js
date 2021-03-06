const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res)=>{
    res.render('index', {
        title:'Weather',
        name:'Adam Shenton'
    })
})

app.get('/about',(req,res)=>{
    res.render('about', {
        title:'About me',
        name:'Adam Shenton'
    })
})

app.get('/help', (req,res)=>{
    res.render('help', {
        title:'Help Page',
        name:'Adam Shenton',
        helpMessage: 'This is an example help message please goto home page'
    })
})

app.get('/weather', (req, res)=>{
    if  (!req.query.address) {
        return res.send({
            error:'You must provide an address'
        })
    }

    geocode(req.query.address, (error,{longitute, latitude, location} = {} )=>{
        if (error) {
            return res.send({
                error
            })
        }

        forecast(longitute,latitude, (error,forecastData)=>{
            if (error) {
              return res.send({
                    error:error
                })
            }
            res.send({
                address: req.query.address,
                forecast: forecastData,
                location: location
            })
        })
    })
})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error:'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req,res) => {
    res.render('404page', {
        title:'404 Page',
        name:'Adam Shenton',
        errorMessage:'Help article not found.'
    })
})

app.get('*',(req,res)=>{
    res.render('404page', {
        title:'404 Page',
        name: 'Adam Shenton',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server started on port ' + port)
})