const { request, response } = require('express')
const pool = require('./conexion')

const ruteador = app=>{
    app.get('/categorias', (request, response)=>{
        pool.query('Select * from categoria', (error, result)=>{
            if (error) throw error
            response.send(result)
        })
    })

    app.post('/newCategoria',(request, response)=>{
        let q  = 'Insert into categoria (nombreCategoria) values (?)'
        let nombreCategoria = request.body.nombreCategoria
        pool.query(q, [nombreCategoria],(error,result)=>{
            if (error) throw erorr
            response.status(201).send(`Categoria insertado con el id: ${result.insertId}`)
        })
    })

    app.post('/registro', (request, response)=>{
        let q = 'Insert into usuarios (nombre_completo, usuario, clave) values (?,?,?)'
        let nombre_completo = request.body.nombre_completo
        let usuario = request.body.usuario
        let clave = request.body.clave
        pool.query(q, [nombre_completo, usuario,clave],(error,result)=>{
            if(error) throw error
            response.status(201).send(`Usuario insertado con el id: ${result.insertId}`)
        })
       
    })

    app.get('/publicaciones/:id',(request, response)=>{
        let q = 'Select titulo, contenido, foto, fecha,nombre_completo  from publicacion inner join usuarios on publicacion.idUsuario = usuarios.idUsuario where idCategoria = ? order by fecha'
        console.log(q)
        pool.query(q, request.params.id, (error, result)=>{
            if (error) throw error
            response.send(result)
        })
    })
    app.post('/newPost',(request, response)=>{
        let q = 'Insert into publicacion (titulo, contenido, foto, fecha, idUsuario, idCategoria) values (?,?,?,?,?,?)'
        let titulo = request.body.titulo
        let contenido = request.body.contenido
        let foto = request.body.foto
        let fecha = request.body.fecha
        let idUsuario=request.body.idUsuario
        let idCategoria=request.body.idCategoria
        pool.query(q, [titulo,contenido, foto,fecha,idUsuario,idCategoria],(error, result)=>{
            if (error) throw error
            response.status(201).send(`Post insertado con el id: ${result.insertId}`)
        })
    })
    app.post('/login',(request, response)=>{
        let q = 'Select * from usuarios where usuario = ? and clave = ? '
        let usuario = request.body.usuario
        let clave = request.body.clave
        pool.query(q, [usuario, clave], (error, result, field)=>{
            if (error){
                console.log(error)
                response.send({'succes':false, message:'Erro al conectar a la base de datos'})
            }
            if (result.length > 0){
                response.send({'succes':true, 'user': result[0].usuario})
            }else{
                response.send({'succes':false, 'message':'Usuario no encontrado'})
            }
        })
        
    })
}



module.exports = ruteador
