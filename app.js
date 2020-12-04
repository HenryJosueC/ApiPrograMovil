const ruteador = require('./rutas')
const express = require ('express')
const puerto = 3000
const app = express()
const bodyparser = require('body-parser')

app.use(bodyparser.json())
app.use(bodyparser.urlencoded(
    {
        extended: true
    }
))
ruteador(app)
const server = app.listen(puerto, (error)=>{
    if (error) throw error
    console.log('Servidor escuchadno en el puerto' + puerto)

})