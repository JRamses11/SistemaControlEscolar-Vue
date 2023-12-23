var express = require("express");
var mysql = require("mysql");
var app = express(); // EJECTUTAMOS EL SERIVIDOR

//HABILIRAR RECEPCION JSON
app.use(express.json());

// ENCENDER EL SERVIDOR
app.listen("3001", function(){
    console.log("Servidor puerto 3001")
});

// CONFIGURAMOS LA CONEXION
var conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'control_escolar'
});

// PROBAR LA CONEXION
conexion.connect(function(error){
    if(error){
        throw error;
    }
    else{
        console.log("Conectado a la base de datos")
    }
});

//CORS 
const cors=require("cors");
const corsOptions ={
    origin:'*', 
    credentials:true, 
    optionSuccessStatus:200,
}
app.use(cors(corsOptions))

app.get("/", function(req, res){ // PETICION --> RESPUESTA
res.send("<h1>Ruta de inicio<h1>")
})

//-----------------------ALUMNOS------------------------------

// MOSTRAR A LOS ALUMNOS
app.get('/api/alumnos', (req, res) => {
    conexion.query("SELECT * FROM alumnos", (error, filas) =>{
        if (error){
            throw error;
        }
        else{
            res.header("Access-Control-Allow-Origin","*");
            res.send(filas);
        }
    });
})

// MOSTRAR SOLO UN ALUMNOS
app.get('/api/alumnos/:ncontrol', (req, res) => {
    // eficiente para que no recorra toda la tabla
    conexion.query("SELECT * FROM alumnos WHERE NCONTROL = ? LIMIT 1", [req.params.ncontrol], (error, fila) => { 
        if (error){
            throw error;
        }else{
            res.send(fila);
        }
    })
})

//AGREGAR UN ALUMNO
app.post("/api/alumnos", (req, res)=>{
    let datos={
        ncontrol: req.body.ncon,
        nombre: req.body.nom,
        carrera: req.body.carr,
        estatus: req.body.est
    }
    let sql="INSERT INTO alumnos SET ?"
    conexion.query(sql, datos, function(error, results){
        if(error){
            throw error;
        }else{
            res.send(results);
        }
    })
})

//ACTUALIZAR DATOS DE ALUMNOS
app.put("/api/alumnos/:ncontrol", (req, res)=>{
    let ncontrol= req.params.ncontrol;
    let nombre= req.body.nom;
    let carrera= req.body.carr;
    let estatus= req.body.est;
    let sql="UPDATE alumnos SET nombre=?, carrera=?, estatus=? WHERE ncontrol=?"
    conexion.query(sql, [nombre, carrera, estatus, ncontrol], function(error,results){
        if(error){
            throw error;
        }else{
            res.send(results);
        }
    })
})

//ELIMINAR UN RESGISTRO DE ALUMNOS
app.delete("/api/alumnos/:ncontrol", (req, res)=>{
    conexion.query("DELETE FROM alumnos WHERE ncontrol=?", [req.params.ncontrol], function(error, filas){
        if(error){
            throw error;
        }else{
            res.send(filas);
        }
    })
})

// -----------------------MAESTROS----------------------------

//CONSULTAR TODOS LOS MAESTROS
app.get('/api/maestros', (req, res) => {
    conexion.query("SELECT * FROM maestros", (error, filas) =>{
        if (error){
            throw error;
        }
        else{
            res.header("Access-Control-Allow-Origin","*");
            res.send(filas);
        }
    });
})

// MOSTRAR SOLO UNN MAESTRO
app.get('/api/maestros/:clavemaestro', (req, res) => {
    // eficiente para que no recorra toda la tabla
    conexion.query("SELECT * FROM maestros WHERE clavemaestro = ? LIMIT 1", [req.params.clavemaestro], (error, fila) => { 
        if (error){
            throw error;
        }else{
            res.send(fila);
        }
    })
})

//AGREGAR UN MAESTRO
app.post("/api/maestros", (req, res)=>{
    let datos={
        clavemaestro: req.body.clama,
        nombre: req.body.nom,
        departamento: req.body.dep,
        estatus: req.body.est
    }
    let sql="INSERT INTO maestros SET ?"
    conexion.query(sql, datos, function(error, results){
        if(error){
            throw error;
        }else{
            res.send(results);
        }
    })
})

//ACTUALIZAR DATOS DE MAESTROS
app.put("/api/maestros/:clavemaestro", (req, res)=>{
    let clavemaestro= req.params.clavemaestro;
    let nombre= req.body.nom;
    let departamento= req.body.dep;
    let estatus= req.body.est;
    let sql="UPDATE maestros SET nombre=?, departamento=?, estatus=? WHERE clavemaestro=?"
    conexion.query(sql, [nombre, departamento, estatus, clavemaestro], function(error,results){
        if(error){
            throw error;
        }else{
            res.send(results);
        }
    })
})

//ELIMINAR UN RESGISTRO DE MAESTRO
app.delete("/api/maestros/:clavemaestro", (req, res)=>{
    conexion.query("DELETE FROM maestros WHERE clavemaestro=?", [req.params.clavemaestro], function(error, filas){
        if(error){
            throw error;
        }else{
            res.send(filas);
        }
    })
})

//------------------------MATERIAS---------------------
//MOSTRAR A TODOS LAS MATERIAS
app.get('/api/materias', (req, res) => {
    conexion.query("SELECT * FROM materias", (error, filas) =>{
        if (error){
            throw error;
        }
        else{
            res.header("Access-Control-Allow-Origin","*");
            res.send(filas);
        }
    });
})

// MOSTRAR SOLO UNA MATERIA
app.get('/api/materias/:clavemateria', (req, res) => {
    // eficiente para que no recorra toda la tabla
    conexion.query("SELECT * FROM materias WHERE clavemateria = ? LIMIT 1", [req.params.clavemateria], (error, fila) => { 
        if (error){
            throw error;
        }else{
            res.send(fila);
        }
    })
})

//AGREGAR UNA MATERIA
app.post("/api/materias", (req, res)=>{
    let datos={
        clavemateria: req.body.clamat,
        nombre: req.body.nom,
        creditos: req.body.cre
    }
    let sql="INSERT INTO materias SET ?"
    conexion.query(sql, datos, function(error, results){
        if(error){
            throw error;
        }else{
            res.send(results);
        }
    })
})

//ACTUALIZAR DATOS DE MATERIAS
app.put("/api/materias/:clavemateria", (req, res)=>{
    let clavemateria= req.params.clavemateria;
    let nombre= req.body.nom;
    let creditos= req.body.cre;
    let sql="UPDATE materias SET nombre=?, creditos=? WHERE clavemateria=?"
    conexion.query(sql, [nombre, creditos, clavemateria], function(error,results){
        if(error){
            throw error;
        }else{
            res.send(results);
        }
    })
})

//ELIMINAR UN RESGISTRO DE MATERIAS
app.delete("/api/materias/:clavemateria", (req, res)=>{
    conexion.query("DELETE FROM materias WHERE clavemateria=?", [req.params.clavemateria], function(error, filas){
        if(error){
            throw error;
        }else{
            res.send(filas);
        }
    })
})

//--------------------------GRUPOS--------------------------------
// MOSTRAR A LOS GRUPOS
app.get('/api/grupos', (req, res) => {
    conexion.query("SELECT * FROM grupos", (error, filas) =>{
        if (error){
            throw error;
        }
        else{
            res.header("Access-Control-Allow-Origin","*");
            res.send(filas);
        }
    });
})

// MOSTRAR SOLO UN GRUPO
app.get('/api/grupos/:clavegrupo', (req, res) => {
    // eficiente para que no recorra toda la tabla
    conexion.query("SELECT * FROM grupos WHERE clavegrupo = ? LIMIT 1", [req.params.clavegrupo], (error, fila) => { 
        if (error){
            throw error;
        }else{
            res.send(fila);
        }
    })
})

//MOSTRAR LOS INCRITOS 
app.get('/api/inscrito/:clavegrupo', (req, res) => {
    // eficiente para que no recorra toda la tabla
    conexion.query("SELECT inscritos FROM grupos WHERE clavegrupo = ? LIMIT 1", [req.params.clavegrupo], (error, fila) => { 
        if (error){
            throw error;
        }else{
            res.send(fila);
        }
    })
})


//MOSTRAR lOS LIMITES DE ALUMNOS
app.get('/api/limite/:clavegrupo', (req, res) => {
    // eficiente para que no recorra toda la tabla
    conexion.query("SELECT limitealumnos FROM grupos WHERE clavegrupo = ? LIMIT 1", [req.params.clavegrupo], (error, fila) => { 
        if (error){
            throw error;
        }else{
            res.send(fila);
        }
    })
})


//AGREGAR UN GRUPO
app.post("/api/grupos", (req, res)=>{
    let datos={
        clavemateria: req.body.clamat,
        clavegrupo: req.body.clag,
        clavemaestro: req.body.clama,
        limitealumnos: req.body.lim,
        inscritos: req.body.ins,
        horariolunes: req.body.hlu,
        horariomartes: req.body.hma,
        horariomiercoles: req.body.hmi,
        horariojueves: req.body.hju,
        horarioviernes: req.body.hvi
    }
    let sql="INSERT INTO grupos SET ?"
    conexion.query(sql, datos, function(error, results){
        if(error){
            throw error;
        }else{
            res.send(results);
        }
    })
})

//ACTUALIZAR DATOS DE GRUPOS
app.put("/api/grupos/:clavegrupo", (req, res)=>{
    // let clavemateria= req.body.clamat;
    let clavegrupo= req.params.clavegrupo;
    // let clavemaestro= req.body.clama;
    let limitealumnos= req.body.lim;
    let inscritos= req.body.ins;
    let horariolunes= req.body.hlu;
    let horariomartes= req.body.hma;
    let horariomiercoles= req.body.hmi;
    let horariojueves= req.body.hju;
    let horarioviernes= req.body.hvi;
    let sql="UPDATE grupos SET limitealumnos=?, inscritos=?, horariolunes=?, horariomartes=?, horariomiercoles=?, horariojueves=?, horarioviernes=? WHERE clavegrupo=?"
    conexion.query(sql, [limitealumnos, inscritos, horariolunes, horariomartes, horariomiercoles, horariojueves, horarioviernes, clavegrupo], function(error,results){
        if(error){
            throw error;
        }else{
            res.send(results);
        }
    })
})

// ACTUALIZAR UN INSCRITO
app.put("/api/inscritos/:clavegrupo", (req, res)=>{
    let clavegrupo= req.params.clavegrupo;
    let sql="UPDATE grupos SET inscritos=inscritos+1 WHERE clavegrupo=?"
    conexion.query(sql, [clavegrupo], function(error,results){
        if(error){
            throw error;
        }else{
            res.send(results);
        }
    })
})

//ELIMINAR UN RESGISTRO DE GRUPO
app.delete("/api/grupos/:clavegrupo", (req, res)=>{
    conexion.query("DELETE FROM grupos WHERE clavegrupo=?", [req.params.clavegrupo], function(error, filas){
        if(error){
            throw error;
        }else{
            res.send(filas);
        }
    })
})

//--------------------CARGA ACADEMICA-------------------
// MOSTRAR LAS CARGAS
app.get('/api/cargas', (req, res) => {
    conexion.query("SELECT * FROM carga", (error, filas) =>{
        if (error){
            throw error;
        }
        else{
            res.header("Access-Control-Allow-Origin","*");
            res.send(filas);
        }
    });
})

// MOSTRAR SOLO UN CARGA
app.get('/api/cargas/:ncontrol', (req, res) => {
    // eficiente para que no recorra toda la tabla
    conexion.query("SELECT * FROM carga WHERE ncontrol = ? LIMIT 1", [req.params.ncontrol], (error, fila) => { 
        if (error){
            throw error;
        }else{
            res.send(fila);
        }
    })
})

//AGREGAR UNA CARGA
app.post("/api/cargas", (req, res)=>{
    let datos={
        clavemateria: req.body.clamat,
        clavegrupo: req.body.clag,
        ncontrol: req.body.ncon
    }
    let sql="INSERT INTO carga SET ?"
    conexion.query(sql, datos, function(error, results){
        if(error){
            throw error;
        }else{
            res.send(results);
        }
    })
})


// //ACTUALIZAR DATOS DE CARGA
// app.put("/api/cargas/:ncontrol", (req, res)=>{
//     let clavemateria= req.params.clama;
//     let clavegrupo= req.body.clag;
//     let ncontrol= req.body.ncon;
//     let sql="UPDATE carga SET clavemateria=?, clavegrupo=?, WHERE ncontrol=?"
//     conexion.query(sql, [clavemateria, clavegrupo, ncontrol], function(error,results){
//         if(error){
//             throw error;
//         }else{
//             res.send(results);
//         }
//     })
// })


// //ELIMINAR UN RESGISTRO DE CARGA
// app.delete("/api/grupos/:ncontrol", (req, res)=>{
//     conexion.query("DELETE FROM grupos WHERE ncontrol=?", [req.params.ncontrol], function(error, filas){
//         if(error){
//             throw error;
//         }else{
//             res.send(filas);
//         }
//     })
// })