const express  = require('express')

const app = express();
const puerto = 3000;


//ruta para comprobar que la api funcionca
app.get('/',(req,res) =>{
    res.send('API DE TAREAS FUNCIONANDO')
})

//INCIAR SERV
app.listen(puerto, ()=>{
    console.log(`SERVIDOR ESCUCHANDO EL PUERTO ${puerto}`);
})

