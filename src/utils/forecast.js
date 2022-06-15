const request = require('request')


const forecast = (latitude,longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=e8eea907ae9376e9d28f0cb5c36bc1b3&query='+ latitude+','+longitude

    request({url, json: true}, (error, {body}) =>{
        if(error){
            callback('Unbale to connect to location services', undefined)
        }else if (body.error){
            callback('Coordinate Error', undefined)
        }else{
              const originalDegree=body.current.temperature
              const feelsLike =body.current.feelslike
              const windSpeed = body.current.wind_speed
              const weatherDescription = body.current.weather_descriptions[0]
              
              callback(undefined, 
                'The weather is '+weatherDescription+'. The original tyemperature is: '+ originalDegree+' and it feels like: '+ feelsLike+ ' and the wind speed is: '+windSpeed
                
            )
        }
    })
}

module.exports = forecast
