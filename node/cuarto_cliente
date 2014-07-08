var http=require('http');
var puerto=3738;
var servidor='127.0.0.1';

function recuperaPacientes() {
    var url,opciones,req;
    
    url='/paciente';
    opciones= {
        hostname: servidor,
        port: puerto,
        path: url,
        method: 'GET'
    };
    
    req = http.request(opciones, function(res) {
                       res.setEncoding('utf8');
                       
                       res.on('data', function (contenido) {
                              console.log('Pacientes actuales: ' + contenido);
                              });
                       });
    
    req.on('error', function(e) {
           console.log('Problem with request: ' + e.message);
           });
    
    req.end();
}

function recuperaPaciente(id) {
    var url,opciones,req;
    var miPaciente;
    
    url='/paciente/' + id;
    opciones= {
    hostname: servidor,
    port: puerto,
    path: url,
    method: 'GET'
    };
    
    req = http.request(opciones, function(res) {
        res.setEncoding('utf8');
        
                       
        res.on('data', function (contenido) {
            miPaciente=contenido;
            console.log(miPaciente);
        });
    });
    
    req.on('error', function(e) {
           console.log('Problem with request: ' + e.message);
           });
    
    req.end();
}

function insertaPaciente(nombre,nif,edad) {
    var url,opciones,req;
    
    url='/paciente/' + encodeURIComponent(nombre) + '/' + nif + '/' + edad;
    opciones= {
        hostname: servidor,
        port: puerto,
        path: url,
        method: 'PUT'
    };

    req = http.request(opciones, function(res) {
        res.setEncoding('utf8');
                       
        res.on('data', function (contenido) {
               console.log('Paciente insertado: ' + contenido);
        });
    });

    req.on('error', function(e) {
       console.log('Problem with request: ' + e.message);
    });

    req.end();
}

function modificaPaciente(id,nombre,nif,edad) {
    var url,opciones,req;
    var datos;
    
    url='/paciente/' + id + '/' + encodeURIComponent(nombre) + '/' + nif + '/' + edad,
    opciones= {
        hostname: servidor,
        port: puerto,
        path: url,
        method: 'POST'
    };
    
    req = http.request(opciones, function(res) {
                       res.setEncoding('utf8');
                       
                       res.on('data', function (contenido) {
                              console.log('Paciente modificado: ' + contenido);
                              });
                       });
    
    req.on('error', function(e) {
           console.log('Problem with request: ' + e.message);
           });
    
    req.end();
}

function eliminaPaciente(id) {
    var url,opciones,req;
    var resultado;
    
    url='/paciente/' + id;
    opciones= {
    hostname: servidor,
    port: puerto,
    path: url,
    method: 'DELETE'
    };
    
    req = http.request(opciones, function(res) {
                       res.setEncoding('utf8');
                       
                       res.on('data', function (contenido) {
                              console.log('Paciente eliminado: ' + id + '(' + contenido + ')');
                        });
    });
    
    req.on('error', function(e) {
           console.log('Problem with request: ' + e.message);
           });
    
    req.end();
}

// Inserto tres pacientes
insertaPaciente('Santiago Reyes','44294340C',38);
insertaPaciente('Fulanito Perez','12345678C',41);
insertaPaciente('Menganito Sanchez','87654321Z',27);


setTimeout(function() {
           // Listo los 3 pacientes actuales
           recuperaPacientes();
           
           // Modifico los valores del primer paciente
           modificaPaciente(1,'Santiago Reyes Jimenez','87654321Z',83);
           
           setTimeout(function() {
                      // Listo los 3 pacientes actuales
                      recuperaPacientes();
                      
                      // Elimino el paciente con id=2
                      eliminaPaciente(2);
                      
                      // Listo los 2 pacientes actuales
                      recuperaPacientes();
            },2000);
},2000);
