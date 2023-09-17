//Importa el paquete
const pgPromise = require('pg-promise')
const config = {
    host: 'ep-orange-dawn-44950987.us-east-2.aws.neon.tech',
    port: '5432',
    database: 'dbBlueVentory',
    user: 'fl0user',
    password: '4JtHQvzL5CYW',
    ssl: {
        rejectUnauthorized: false
    }
}
//Instancia como objeto
const pgp = pgPromise({})
const db = pgp(config)

// console.log('Conexion ok')
// db.any('Select * from tbl_marca')
//      .then(res => { console.table(res) })

//Permite exportar la variable a otros archivos
exports.db = db