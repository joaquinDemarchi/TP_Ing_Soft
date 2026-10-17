# API de Tareas

API REST  hecha en Node.js que permite ver y agregar tareas. El proyecto está preparado para ejecutarse con Docker, así que no hace falta instalar Node.js ni ninguna otra herramienta de programación.

## Tecnologías utilizadas

- **Node.js**: el lenguaje con el que está hecha la aplicación.
- **Express**: una herramienta de Node.js que facilita crear APIs.
- **Docker**: para empaquetar y ejecutar la aplicación.

## Requisitos

Solo se necesita una cosa: **Docker Desktop**.

1. Entrá a https://www.docker.com/products/docker-desktop/
2. Descargá la versión para tu sistema (Windows o Mac) e instalala como cualquier programa.
3. Abrí Docker Desktop y esperá a que diga que está funcionando (*Engine running*). **Tiene que quedar abierto** mientras uses la aplicación.

## Cómo ejecutar la aplicación

### Paso 1: Descargar el proyecto

1. En GitHub, tocar el botón verde **Code**.
2. Elegir **Download ZIP**.
3. Descomprimir el archivo 

### Paso 2: Abrir la terminal en la carpeta del proyecto

- **Windows**: entrar a la carpeta descomprimida, haer clic derecho en un espacio vacío y elegir **Abrir en Terminal**.

### Paso 3: Construir la imagen

Una **imagen** es la "caja" con la aplicación lista para usar. Para crearla, escribí este comando en la terminal y presioná Enter:

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
docker run -p 3000:3000 api-tareas
```

- `docker run` poner en marcha la aplicación.
- `-p 3000:3000` conectar el puerto 3000 de tu computadora con el puerto 3000 de la aplicación. Un **puerto** es como una "puerta" por donde entran los pedidos.

Cuando aparezca el mensaje `Servidor escuchando en el puerto 3000`, la aplicación está funcionando. **No cerrar la terminal** se use.

### Paso 5: Probar la aplicación

Abrir navegador (Chrome, Firefox, etc.) y escribir estas direcciones en la barra de arriba:
9
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

Después volver a abrir `http://localhost:3000/tareas` para visualizar la tarea nueva en la lista.

> Las tareas se guardan solo mientras la aplicación está funcionando. Si se cierran, se borran.

### Paso 6: Detener la aplicación

Volver a la terminal donde está funcionando y presionar **Ctrl + C**.