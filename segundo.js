var pacientes='1;Santiago Reyes;44294340C;38@2;Pepito Perez;12345678A;25@3;Fulanito Sanchez;87654321Z;41@4;Manuela Dominguez;13579246H;31';
var citas = '1;20140623081200;2@2;20140623084200;1@3;20140623090230;4@4;20140624082600;3@5;20140624083430;1';
var listaPacientes,listaCitas;

var http=require('http');

/* Convierto el contenido de la cadena 'pacientes' en una lista de objetos */
function cargaPacientes() {
    var i,elemento;
    var lista1,lista2;
    
    listaPacientes = new Array();
    lista1=pacientes.split('@');
    for (i = 0; i < lista1.length; i++) {
        lista2 = lista1[i].split(';');
        if (lista2.length != 4) {
            alert('La información \'' + lista1[i] + '\' no es correcta para definir un paciente');
        }
        else {
            // Creo un objeto con los datos del paciente
            elemento = {
            CodigoPaciente: lista2[0],
            Nombre: lista2[1],
            NIF: lista2[2],
            Edad: lista2[3]
            };
            
            // Añado el objeto que define un paciente a la lista de pacientes
            listaPacientes.push(elemento);
        }
    }
}

/* Convierto el contenido de la cadena 'citas' en una lista de objetos */
function cargaCitas() {
    var i,elemento;
    var lista1,lista2;
    
    listaCitas = new Array();
    lista1=citas.split('@');
    for (i = 0; i < lista1.length; i++) {
        lista2 = lista1[i].split(';');
        if (lista2.length != 3) {
            alert('La información \'' + lista1[i] + '\' no es correcta para definir una cita');
        }
        else {
            // Creo un objeto con los datos de la cita
            elemento = {
            CodigoCita: lista2[0],
            Hora: lista2[1],
            CodigoPaciente: lista2[2]
            };
            
            // Añado el objeto que define una cita la lista de citas
            listaCitas.push(elemento);
        }
    }
}

cargaPacientes();
cargaCitas();


http.createServer(function(req,res) {
                  var llamada;
                  
                  llamada=req.url.split('/');
                  
                  switch (llamada[1].toLowerCase()) {
                    case 'paciente':
                        res.writeHead(200, {'content-type': 'text/plain'});
                        res.write(JSON.stringify(listaPacientes));
                        break;
                  
                    case 'cita':
                        res.writeHead(200, {'content-type': 'text/plain'});
                        res.write(JSON.stringify(listaCitas));
                        break;
                  
                    default:
                        res.writeHead(404, {'content-type': 'text/html'});
                        res.write('<html><body><h1>Llamada incorrecta</h1><h2>Prueba con:</h2>');
                        res.write('<p>\'/paciente\': Devuelve todos los objetos "paciente" en formato json</p>');
                        res.write('<p>\'/cita\': Devuelve todos los objetos "cita" en formato json</p>');
                  break;
                  }
                  res.end();
                  
}).listen(3738,'127.0.0.1');

console.log('Servidor publicado sobre \'http://127.0.0.1:3738/\'');
