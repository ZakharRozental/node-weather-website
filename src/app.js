const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



const app = express()
//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//Set handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Zak Rozental'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Zak Rozental'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        name: 'Zak Rozental',
        message: 'We would like to help you!'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.city){
      return res.send({
            error: 'the city is not entered'
        })
    }

    geocode(req.query.city, (error, {latitude, longitude, location}={})=>{
        if(error){
            return res.send({
                error: error
            })
        }else{
            forecast(latitude, longitude, (error, forecastData)=>{
    
                if(error){
                    return console.log(error)
                }
                else{
                    res.send({
                        city: req.query.city,
                        location: location,
                        forecast: forecastData
                    })
                }
            })
        }
    })
    })

app.get('/help/*',(req, res)=>{
    res.render('nopage',{
        title:404,
        name: 'Zak Rozental',
        errorMessage:'Help article not found'
    })
    })    

app.get('*', (req, res)=>{
    res.render('nopage', {
        title:404,
        name: 'Zak Rozental',
        errorMessage: 'Page not found'
    })
})    

app.listen(3000, ()=>{
    console.log('Server is up on port 3000.')
})