var express=require('express');
var logfmt = require("logfmt");
var app = express();
var listaPacientes = [];

app.use(logfmt.requestLogger());

app.get('/', function (req, res) {
        res.send('Servicio para el mantenimiento de pacientes');
});

app.put('/paciente/:nombre/:nif/:edad', function( req,res ) {
        var id,nombre,nif,edad;
        var miPaciente;
        
        // 1: Recupero las variables de la llamada
        nombre=req.param('nombre');
        nif=req.param('nif');
        edad=req.param('edad');
        
        // 2: Calculo el id del nuevo paciente
        id=calculaNuevoID();
        
        // 3: Creo el paciente nuevo
        miPaciente={
            IDPaciente: id,
            Nombre: nombre,
            NIF: nif,
            Edad: edad
        };
        
        // 4: Inserto el paciente en la lista
        listaPacientes.push(miPaciente);
        
        // 5: Devuelvo el nuevo paciente
        res.json(200,miPaciente);
});

app.get('/paciente/:id', function (req, res) {
        var id;
        
        id=req.param('id');
        
        miPaciente=buscaPaciente(id);
        if (miPaciente==null) {
            res.send(404,'No se encontró el paciente con id: \'' + id + '\'');
        }
        else {
            res.json(200,miPaciente);
        }
});

app.post('/paciente/:id/:nombre/:nif/:edad', function (req, res) {
         var id,nombre,nif,edad;
         var miPaciente;
         
         // 1: Recupero las variables de la llamada
         id=req.param('id');
         nombre=req.param('nombre');
         nif=req.param('nif');
         edad=req.param('edad');
         
         // 2: Busco el paciente solicitado
         miPaciente=buscaPaciente(id);
         if (miPaciente==null) {
            res.send(404,'No se encontró el paciente a modificar con id: \'' + id + '\'');
         }
         else {
            // 3: Modifico los datos del paciente
            miPaciente.Nombre=nombre;
            miPaciente.NIF=nif;
            miPaciente.Edad=edad;
         
            res.json(200,miPaciente);
         }
});

app.delete('/paciente/:id', function (req, res) {
         var id,resultado;
         
         // 1: Recupero las variables de la llamada
         id=req.param('id');
         
         // 2: Busco el paciente solicitado
         resultado=eliminaPaciente(id);
         if (resultado==null) {
           res.send(200,'No se encontró el paciente a eliminar con id: \'' + id + '\'');
         }
           else {
         res.send(200,'OK');
           }
});

app.get('/paciente', function (req, res) {
        res.json(200,listaPacientes);
});

app.listen(3738);
console.log('Ejecutando servidor en http://127.0.0.1:3738/');


function buscaPaciente(idPaciente) {
    var i,elemento;
    
    for (i=0;i<listaPacientes.length;i++) {
        if (listaPacientes[i].IDPaciente==idPaciente) {
            return (listaPacientes[i]);
        }
    }
    
    return(null);
}

function calculaNuevoID() {
    var i,id;
    
    id=0;
    for (i=0;i<listaPacientes.length;i++) {
        if (listaPacientes[i].IDPaciente>id) {
            id=listaPacientes[i].IDPaciente;
        }
    }
    
    return(++id);
}

function eliminaPaciente(idPaciente) {
    var i,elemento;
    
    for (i=0;i<listaPacientes.length;i++) {
        if (listaPacientes[i].IDPaciente==idPaciente) {
            listaPacientes.splice(i, 1);
            return('');
        }
    }
    
    return(null);
}
