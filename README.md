# API de Tareas

API REST hecha en Node.js que permite ver y agregar tareas. Las tareas se guardan en una base de datos SQLite, así que no se pierden al cerrar la aplicación. El proyecto está preparado para ejecutarse con Docker, así que no hace falta instalar Node.js ni ninguna otra herramienta de programación.

## Tecnologías utilizadas

- **Node.js**: el lenguaje con el que está hecha la aplicación.
- **Express**: una herramienta de Node.js que facilita crear APIs.
- **SQLite**: una base de datos que guarda toda la información en un solo archivo.
- **Docker**: para empaquetar y ejecutar la aplicación.

## Requisitos

Solo se necesita una cosa: **Docker Desktop**.

1. Entrar a https://www.docker.com/products/docker-desktop/
2. Descargar la versión para tu sistema (Windows o Mac) e instalarla como cualquier programa.
3. Abrir Docker Desktop y esperar a que diga que está funcionando (*Engine running*). **Tiene que quedar abierto** mientras se use la aplicación.

## Cómo ejecutar la aplicación

### Paso 1: Descargar el proyecto

1. En GitHub, tocar el botón verde **Code**.
2. Elegir **Download ZIP**.
3. Descomprimir el archivo.

### Paso 2: Abrir la terminal en la carpeta del proyecto

- **Windows**: entrar a la carpeta descomprimida, hacer clic derecho en un espacio vacío y elegir **Abrir en Terminal**.

### Paso 3: Construir la imagen

Una **imagen** es la "caja" con la aplicación lista para usar. Para crearla, escribir este comando en la terminal y presionar Enter:

```
docker build -t api-tareas .
```

- `docker build` le dice a Docker que arme la imagen.
- `-t api-tareas` le pone el nombre "api-tareas".
- El punto `.` al final indica que use los archivos de la carpeta actual.

La primera vez puede tardar uno o dos minutos. Esperar hasta que la terminal deje de mostrar texto.

### Paso 4: Ejecutar el contenedor

El **contenedor** es la imagen funcionando. Para iniciarlo, escribir:

```
docker run -p 3000:3000 -v datos-tareas:/app/datos api-tareas
```

- `docker run` pone en marcha la aplicación.
- `-p 3000:3000` conecta el puerto 3000 de tu computadora con el puerto 3000 de la aplicación. Un **puerto** es como una "puerta" por donde entran los pedidos.
- `-v datos-tareas:/app/datos` crea un **volumen**: un espacio de almacenamiento que Docker guarda fuera de la aplicación. Ahí se guarda la base de datos, así que las tareas siguen estando aunque se cierre y se vuelva a abrir la aplicación.

Cuando aparezca el mensaje `Servidor escuchando en el puerto 3000`, la aplicación está funcionando. **No cerrar la terminal** mientras se use la aplicación.

### Paso 5: Probar la aplicación

Abrir el navegador (Chrome, Firefox, etc.) y escribir estas direcciones en la barra de arriba:

| Dirección | Qué muestra |
|---|---|
| `http://localhost:3000` | Un mensaje que confirma que la API funciona |
| `http://localhost:3000/tareas` | La lista de todas las tareas |
| `http://localhost:3000/tareas/1` | Solo la tarea número 1 |

`localhost` significa "mi propia computadora".

Para **agregar una tarea** no alcanza con el navegador. Abrir una **segunda** terminal y escribir:

- **Windows (PowerShell):**
  ```
  Invoke-RestMethod -Method Post -Uri http://localhost:3000/tareas -ContentType "application/json" -Body '{"titulo": "Mi nueva tarea"}'
  ```

Después volver a abrir `http://localhost:3000/tareas` para ver la tarea nueva en la lista.

> Las tareas quedan guardadas aunque se cierre la aplicación, siempre que se vuelva a abrir con el mismo comando del Paso 4.

### Paso 6: Detener la aplicación

Volver a la terminal donde está funcionando y presionar **Ctrl + C**.