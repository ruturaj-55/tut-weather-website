const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

console.log(__dirname)
console.log(path.join(__dirname,'../public'))

const app = express()                   //variable to store express application


//Define Paths for express config                                                      
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname,'../templates/partials')


//Setup handlebars engine and views location
app.set('view engine','hbs')             
app.set('views',viewPath)
hbs.registerPartials(partialspath)                                       //provides the view engine as dynamic webpages hbs   




//setup satic directories for server
app.use(express.static(publicDirectoryPath))                                //sets the path for all the static members for website

app.get('' ,(req, res)=>{
    res.render('index',{
        title: 'Weather',                                             //pasing dynamic values to render which can be accessed trough hbs
        name: 'Ruturaj Patil' 
    })
})

app.get('/about' ,(req, res)=>{
    res.render('about',{
        title: 'About Page',
        name: 'Ruturaj Patil'

    })
})
app.get('/help' ,(req, res)=>{
    res.render('help',{
        title: 'Help Page',
        name: 'Ruturaj Patil'

    })
})



app.get('/weather' ,(req, res)=>{

    if(!req.query.address){
        return res.send({
            error:'Address must be provided'
        })
    }
    
   geocode(req.query.address, (error, {latitude, longitude, location}={}) => {
       if (error){
           return res.send({error})
       }
       forecast (latitude,longitude, (error, forecastdata)=>{
           if (error){
               return res.send({error})
           }
           res.send({
               forecast:forecastdata,
               location,
               address: req.query.address
           })

       })

   })   
       
})

app.get('/products',(req,res)=>{

    if(!req.query.search){
        return res.send({
            error:'Search must be provided'
        })
    }
    console.log(req.query)
    res.send({
        product:[]
    })
})

app.get('/help/*' ,(req, res)=>{
    res.render('404',{
        title: '404',
        name:'Ruturaj PAtil',
        errormessage: 'Help article not found'
    })
    
})

app.get('*' ,(req, res)=>{
    res.render('404',{
        title:'404',
        name: 'Ruturaj Patil',
        errormessage: 'Page not found'
    })    
})

app.listen(3000 ,()=>{
    console.log('Server is up on port 3000')
})