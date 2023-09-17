const express = require('express');
const app = express();
app.disable('x-powered-by')

const PORT = process.env.PORT || 8080;

//Midleware (se ejecuta entre la request y response)
//Midle - Analiza y procesa las solicitudes con datos en formatos json
app.use(express.json());
//Midle - Analizá y procesa las solicitudes con datos codificados en la url
app.use(express.urlencoded({extended:true}))
//Rutas
app.use(require('./Routes/index'));

app.get('/',(req,res)=>{
    res.send('<h1>Mi página de APIS</h1>')
    //res.json({message:'Hola mundo'})
});

app.use((req,res)=>{
    res.status(404).send('<h1>404</h1>')
})

app.listen(PORT,()=>{
    console.log(`Server listening on port http://localhost:${PORT}`)
})