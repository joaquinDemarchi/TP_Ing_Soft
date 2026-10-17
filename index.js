const express  = require('express')

const app = express();
const puerto = 3000;

app.use(express.json());

//ruta para comprobar que la api funcionca
app.get('/',(req,res) =>{
    res.send('API DE TAREAS FUNCIONANDO')
})

// se borra al apagar el servidor
const tareas = [
  { id: 1, titulo: 'Estudiar Git', completada: true },
  { id: 2, titulo: 'Armar el Dockerfile', completada: false },
  { id: 3, titulo: 'Escribir el README', completada: false }
];

// Devuelve todas las tareas
app.get('/tareas', (req, res) => {
  res.json(tareas);
});

// Devuelve una tarea
app.get('/tareas/:id', (req, res) => {
  const id = Number(req.params.id);
  const tarea = tareas.find((t) => t.id === id);

  if (!tarea) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  res.json(tarea);
});0

//crear tarea 
app.post('/tareas', (req, res) => {
  const { titulo } = req.body || {};

  if (!titulo) {
    return res.status(400).json({ error: 'El título es obligatorio' });
  }

  const nuevaTarea = {
    id: tareas.length + 1,
    titulo: titulo,
    completada: false
  };

  tareas.push(nuevaTarea);
  res.status(201).json(nuevaTarea);
});


//INCIAR SERV
app.listen(puerto, ()=>{
    console.log(`SERVIDOR ESCUCHANDO EL PUERTO ${puerto}`);
})

