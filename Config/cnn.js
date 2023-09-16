//Importa el paquete
const pgPromise = require('pg-promise')
const config = {
    host: 'localhost',
    port: '5432',
    database: 'db_blue_ventory',
    user: 'postgres',
    password: '0505',
    ssl: false
}
//Instancia como objeto
const pgp = pgPromise({})
const db = pgp(config)

// console.log('Conexion ok')
// db.any('Select * from tbl_marca')
//      .then(res => { console.table(res) })

//Permite exportar la variable a otros archivos
exports.db = db