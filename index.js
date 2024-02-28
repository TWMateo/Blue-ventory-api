const app = require('./app')
const db = require('./src/models')

const PORT = process.env.PORT || 3000;

db.sequelize
.authenticate()
.then(()=>{
    console.log('Conexion a la BDD exitosa')
    app.listen(PORT,(err)=>{
        if(err){
            return console.log('Failed', err)
        }
        console.log(`Listening on port http://localhost:${PORT}`)
        return app
    })
}).catch((err)=>console.log('Unabla to connect to the database',err))