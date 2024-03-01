const express = require('express');
const app = express();
const tallaRoutes = require('./src/api/Routes/tallaRoutes')
const marcaRoutes = require('./src/api/Routes/marcaRoutes')
const categoriaRoutes = require('./src/api/Routes/categoriaRoutes')
app.disable('x-powered-by')

//Midleware (se ejecuta entre la request y response)
//Midle - Analiza y procesa las solicitudes con datos en formatos json
app.use(express.json());
//Midle - Analizá y procesa las solicitudes con datos codificados en la url
app.use(express.urlencoded({extended:true}))
//Rutas
app.use(require('./src/api/Routes/index'));
app.use(marcaRoutes)
app.use(tallaRoutes)
app.use(categoriaRoutes)

app.get('/',(req,res)=>{
    res.send('<h1>Mi página de APIS</h1>')
    //res.json({message:'Hola mundo'})
});

app.use((req,res)=>{
    res.status(404).send('<h1>404</h1>')
})

module.exports = app