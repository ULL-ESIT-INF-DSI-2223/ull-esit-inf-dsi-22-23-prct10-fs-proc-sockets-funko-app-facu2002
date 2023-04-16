# Práctica 10: APIs asíncronas de gestión del sistema de ficheros, creación de procesos y creación de sockets de Node.js

## Facundo José García Gallo


<p align="center">
  <a href="https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct10-fs-proc-sockets-funko-app-facu2002/actions/workflows/node.js.yml">
    <img alt="Tests" src="https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct10-fs-proc-sockets-funko-app-facu2002/actions/workflows/node.js.yml/badge.svg">
  </a>
  <a href="https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct10-fs-proc-sockets-funko-app-facu2002/actions/workflows/coveralls.yml">
    <img alt="Coveralls" src="https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct10-fs-proc-sockets-funko-app-facu2002/actions/workflows/coveralls.yml/badge.svg">
  </a>
  <a href="https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct10-fs-proc-sockets-funko-app-facu2002/actions/workflows/sonarcloud.yml">
    <img alt="Sonar-Cloud" src="https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct10-fs-proc-sockets-funko-app-facu2002/actions/workflows/sonarcloud.yml/badge.svg">
  </a>
</p>


## Índice

1. [Introducción](#introducción)
2. [Ejercicio 1](#ejercicio-1)
3. [Ejercicio 2](#ejercicio-2)
4. [Ejercicio 3](#ejercicio-3)
5. [Modificación](#modificación)
6. [Conclusión](#conclusión)
7. [Bibliografía](#bibliografía)


### Introducción

Para la realización de esta práctica tuve que repasar algunos conceptos sobre sockets, ya que es un tema bastante complejo y me costó entender. También tuve que repasar algunos conceptos sobre las estructras de datos que utiliza JS para poder realizar la traza del ejercicio 1. A continuación explicaré la toma de decisiones que tuve que realizar para poder desarrollar la práctica.


### Ejercicio 1

Para poder comprender como funciona la traza del ejemplo de código dado, lo primero que hay que hacer es entender como funciona el código. Lo primero que se hace es comprobar si se pasa el número de parámetros suficientes por comandos, que son tres: el entorno de ejecución, el script del programa y el nombre del fichero. En caso negativo, se imprime por pantalla un mensaje de error y se finaliza la ejecución del código. En otro caso pasa a ejecutarse el programa de la siguiente manera: primero se declara una variable con el nombre del fichero, luego se hace una llamada a la función access. Esta función recibe tres parámetros, el nombre de un fichero, unas constantes y una función callback, lo que hace es comprobar que el fichero existe atendiendo a las constantes, las cuales especifican cuál es el modo de acceso al fichero (en este caso las constantes indican que solo se verifica la existencia del archivo), independientemente de que el fichero exista o no, se ejecuta el tercer y último argumento, una función callback que, a su vez, contiene un parámetro que maneja los errores que pudieron haber ocurrido durante la comprobación de la existencia del fichero. Al ejecutarse esta función pueden ocurrir dos cosas, el fichero no existe y el manejador emite un error o el fichero si existe. En el caso de que el fichero exista, se imprime por pantalla un mensaje informando de que se comenzó a observar el fichero y se declara un observador el cual apunta al fichero. Cuando el observador detecta un cambio en el fichero (gracias al evento "change"), imprime por pantalla un mensaje informando de que el fichero ha cambiado. Finalmente se muestra un mensaje por pantalla diciendo que el fichero ya no se encuentra en observación.

Esto es lo que supuestamente el programa debería hacer, pero al tratarse de programación asíncrona y trabajar con estructuras de datos especiales, esta ejecución cambia ligeramente, a continuación pasaré a explicar por qué.

El ejemplo práctico que se propone es el siguiente:

1. Se ejecuta el programa con un fichero `helloworld.txt` existente.
2. Se modifica dos veces el fichero.
3. Finaliza la ejecución.

Lo primero que ocurre es que se añade ```console.log(`Starting to watch file ${filename}`);``` a la pila de llamadas, esto pasa inmediatamente a ejecutarse ya que se encuentra en la cima de la pila, por lo que por pantalla estaríamos viendo algo como ```Starting to watch file src/helloworld.txt```. A continuación entra en la pila de llamadas el obervador, es decir, ```watcher.on('change', () => { console.log(`File ${filename} has been modified somehow`);});```, al encontrarse en la cima de la pila, pasa al registro de eventos de la API ya que se trata de un manejador. Luego pasaría a la pila de llamadas el siguiente texto a imprimir, que sería ```console.log(`File ${filename} is no longer watched`);```, este console, al estar en la cima de la pila pasa a ejecutarse y pasaríamos a ver por pantalla algo como esto ```File src/helloworld.txt is no longer watched```. Haciendo un recuento, hasta ahora en el registro de eventos de la API se encuentra el manejador del observador, es decir el watcher a la espera, la pila de llamadas y la cola de manejadores se encuentra vacía.
Es ahora cuando se produce el primer cambio en el fichero, por lo que en este preciso momento, el observador pasa del registro de eventos de la API a la cola de manejadores (esto se hará siempre que se detecte un cambio en el fichero que se encuentra observando). Siempre y cuando la pila de llamadas se encuentre vacía y la cola de manejadores tenga algún elemento, el elemento del frento o cabeza, pasa a ejecutarse, como es el caso, ya que la pila en este preciso momento se encuentra vacía y la cola de manejadores contiene el observador. Ahora pasa mostrarse por pantalla el mensaje ```console.log(`File ${filename} has been modified somehow`);```, por lo que se podría observar algo como ```File src/helloworld.txt has been modified somehow```. Al modificarse dos veces, este último proceso se repetirá nuevamente. Desde el registro de eventos, el observador detecta un cambio y pasa a la cola de manejadores, al encontrase la pila vacía, este elemento, que se encuentra en la cabeza, pasa a ejecutarse, imprimiendo nuevamente ```File src/helloworld.txt has been modified somehow``` por pantalla.


### Ejercicio 2

Para la explicación de este ejercicio primero explicaré la zonas comunes de los dos subapartados y luego me centraré en cada zona por separado.
Primero aparece la zona en la que se gestiona la entrada por línea de comandos, en ambos casos se pide el nombre del fichero obligatoriamente, y como parámetros opcionales aparecen tres, cada uno referente a un tipo de ejecución distinta, líneas, caracteres y palabras. A continuación se hace una llamada a la función principal, en ambos subapartados se hace lo mismo pero se llaman diferente, la función recibe una string que representa el nombre del fichero y tres parámetros opcionales, de los que hablábamos antes, líneas, caracteres y palabras. En caso de que los tres parámetros sean undefined, se ejecuta el código mostrando las tres opciones.

A continuación es donde comienzan los cambios, por un lado pasaré a explicar el código utilizando pipes. Por ejemplo para imprimir la información relacionada con las líneas sería algo como lo siguiente:

```typescript
1    function imprimirLineasFicheroPipe(nombreFichero: string) : void {
2      const wc = spawn('wc', ['-l', nombreFichero]);
3      console.log("Número de líneas: ");
4      wc.stdout.pipe(process.stdout);
5    }
```

Lo que se realiza en este código es crear un proceso hijo, en este caso, el comando wc, que se encarga de contar las líneas de un fichero, el parámetro -l indica que se quieren contar las líneas, y el parámetro nombreFichero indica el fichero del que se quieren contar las líneas. A continuación se utiliza el método pipe, que se encarga de redirigir la salida estándar del proceso hijo hacia la entrada estándar del proceso padre, es decir, el proceso que ejecuta el código. De esta manera, lo que se imprime por pantalla en el proceso hijo, se imprimirá por pantalla en el proceso padre. Para el caso de contar las palabras se realiza de la misma manera pero cambiando el argumento -l por -w, y para el caso de contar los caracteres se cambia el argumento -l por -c.


Ahora vamos con el siguiente subapartado, realizar el mismo programa pero sin el uso de pipes. En este caso, el código sería algo como lo siguiente:

```typescript
1    function imprimirLineasFichero(nombreFichero: string) : void {
2      const wc = spawn('wc', ['-l', nombreFichero]);
3    
4      let wcSalida = '';
5      wc.stdout.on('data', (piece) => wcSalida += piece);
6    
7      wc.on('close', () => {
8        const wcSalidaArray = wcSalida.split(/\s+/);
9        console.log(`Número de líneas : ${wcSalidaArray[0]}`);
10     });
11   }
```

En este caso, lo que se hace es crear un proceso hijo, en este caso, el comando wc, que se encarga de contar las líneas de un fichero, el parámetro -l indica que se quieren contar las líneas, y el parámetro nombreFichero indica el fichero del que se quieren contar las líneas. A continuación se crea una variable wcSalida, que se encargará de almacenar la salida del proceso hijo, es decir, el número de líneas del fichero. Para ello, se utiliza el método on, que se encarga de añadir un manejador a un evento, en este caso, el evento data, que se ejecutará cuando el proceso hijo envíe datos al proceso padre. Una vez tenemos toda la información en la variable wcSalida, llamamos al método on nuevamente pero esta vez para el evento close, que se ejecutará cuando el proceso hijo finalice su ejecución. En este manejador, se realiza un split de la variable wcSalida, que se encarga de dividir la cadena en un array de strings, para imprimirlo por pantalla correctamente. Para el caso de contar las palabras se realiza de la misma manera pero cambiando el argumento -l por -w, y para el caso de contar los caracteres se cambia el argumento -l por -c.

### Ejercicio 3

Gran parte de la solución que proporciono para este ejercicio se basa en el código de la práctica anterior, por lo que opté por meterlo en una carpeta aparte llamada funko dentro de la misma carpeta del ejercicio. Además creé dos ficheros, uno para el cliente y otro para el servidor. Por último quiero destacar la creación de un fichero para alojar los tipos de mensajes que se pueden enviar, request y response.

Dentro del cliente coloqué toda la gestión de la entrada por línea de comandos, es decir, la gestión de los parámetros que se pasan al ejecutar el programa, igual a la práctica anterior.

A continuación lo que hice fue hacer una llamada a la función connect que se encarga de conectarse a un socket, creo la petición que hace el usuario en base a los argumentos que se han pasado y lo transformo a una cadena con formato JSON (hay que resaltar que se envía con un salto de línea), para poder enviarlo correctamente y que el servidor lo entienda correctamente. Una vez hecho esto, se envía la petición a través del socket al servidor con la ayuda del comando write.

```typescript
1    const client = net.connect({port: 60300}, () => {
2      const request: RequestType = {
3        type: accion,
4        usuario: usuario,
5        idFunko: id,
6        funko: [funko]
7      };
8    
9      const comando = JSON.stringify(request) + '\n';
10     client.write(comando);
```

Ahora pasaré a la zona del servidor que gestiona esta recepción del mensaje. Para empezar se crea el servidor y se decalara la variable en la que será almacenada la petición. A continuación se crea un manejador que se ejecutará cuando el servidor reciba datos del cliente, en este caso, la petición del cliente. Una vez recibida la petición, se detecta que llegue ese salto de línea para poder determinar donde finaliza la recepción. Luego se ejecuta un bucle donde se rescata el mensaje recibido y se parsea a formato JSON.


```typescript
1    net.createServer((connection) => {
2      let wholeData = '';
3      connection.on('data', (dataChunk) => {
4        wholeData += dataChunk;
5        let messageLimit = wholeData.indexOf('\n');
6        while (messageLimit !== -1) {
7          const message = wholeData.substring(0, messageLimit);
8          const accion = JSON.parse(message.toString());
9          let funko: Funko;
10         let response: ResponseType = { type: '', success: false, usuario: "", idFunko: 0, funkos: [] };
```


A continuación se declara el switch que maneja todas las acciones que se pueden realizar. La primera de ellas es la de añadir un funko:
Primero se crea al funko en base a los argumentos enviados y luego se hace una llamada a la función que gestiona la base de datos para añadir el funko. Si la función devuelve true, se crea la respuesta satisfactoria, en caso contrario, se crea la respuesta de error.

```typescript
1    case 'Add':
2      funko = new Funko(accion.funko[0].id, accion.funko[0].nombre, accion.funko[0].descripcion, accion.funko[0].tipo, accion.funko[0].genero,
3              accion.funko[0].franquicia, accion.funko[0].numero, accion.funko[0].exclusivo, accion.funko[0].caracteristicas, accion.funko[0].valor);
4      if(ManejadorJSON.agregarFunkoDB(funko, accion.usuario)) {
5        response = { type: 'Add', success: true, usuario: accion.usuario, idFunko: funko.Id, funkos: [funko] };
6      } else {
7        response = { type: 'Add', success: false, usuario: accion.usuario, idFunko: funko.Id, funkos: [funko] };
8      }
9      break;
```

El siguiente caso es el de eliminar un funko de la colección, este caso es más sencillo ya que se hace una llamada a la función que lo gestiona y se crea la respuesta en base a si la función devuelve true o false.

```typescript	
1    case 'Remove':
2      if(ManejadorJSON.eliminarFunkoDB(accion.idFunko, accion.usuario)) {
3        response = { type: 'Remove', success: true, usuario: accion.usuario, idFunko: accion.idFunko, funkos: [] };
4      } else {
5        response = { type: 'Remove', success: false, usuario: accion.usuario, idFunko: accion.idFunko, funkos: [] };
6      }
7      break;
```


Para el caso de modificar un funko es muy paracido al de añadir, solo que en este caso se crea el funko con los datos que se han pasado por parámetro y se hace una llamada a la función que gestiona la base de datos para modificar el funko. Si la función devuelve true, se crea la respuesta satisfactoria, en caso contrario, se crea la respuesta de error.

```typescript
1    case 'Update':
2      funko = new Funko(accion.funko[0].id, accion.funko[0].nombre, accion.funko[0].descripcion, accion.funko[0].tipo, accion.funko[0].genero,
3        accion.funko[0].franquicia, accion.funko[0].numero, accion.funko[0].exclusivo, accion.funko[0].caracteristicas, accion.funko[0].valor);
4      if(ManejadorJSON.modificarFunkoDB(funko, accion.usuario)) {
5        response = { type: 'Update', success: true, usuario: accion.usuario, idFunko: funko.Id, funkos: [funko] };
6      } else {
7        response = { type: 'Update', success: false, usuario: accion.usuario, idFunko: funko.Id, funkos: [funko] };
8      }
9      break;
```

Para el caso de listar los funkos de un usuario tuve que modificar la práctica anterior para que la función encargada de ello devuelva la lista de los funkos y así poderla enviar al cliente el cual imprime la lista por pantalla.

Para ello se crea un vector de funkos en el que se almacenan los funkos que devuelve la función y se crea la respuesta con el vector de funkos. En caso de que no exista el usuario se crea una respuesta de error.

```typescript
1    case 'List':
2      if(ManejadorJSON.listarFunkoDB(accion.usuario).length === 0) {
3        response = { type: 'List', success: false, usuario: accion.usuario, idFunko: accion.idFunko, funkos: [] };
4      } else {
5        const vectorFunkos = ManejadorJSON.listarFunkoDB(accion.usuario);
6        response = { type: 'List', success: true, usuario: accion.usuario, idFunko: accion.idFunko, funkos: vectorFunkos };
7      }
8      break;
```

Y por último el caso de leer un único funko, en este caso se crea la respuesta en base a si la función devuelve un vector vacío o no. En caso de que no exista el usuario se crea una respuesta de error. En el caso de que sí exista el usuario y el funko, se devuelve el funko desde la función y se crea la respuesta con el funko.

```typescript
1    case 'Read':
2      if(ManejadorJSON.mostrarFunkoDB(accion.idFunko, accion.usuario).length === 0) {
3        response = { type: 'Read', success: false, usuario: accion.usuario, idFunko: accion.idFunko, funkos: [] };
4      } else {
5        const readFunko = ManejadorJSON.mostrarFunkoDB(accion.idFunko, accion.usuario);
6        response = { type: 'Read', success: true, usuario: accion.usuario, idFunko: accion.idFunko, funkos: readFunko };
7      }
8      break;
```

Desde este lado de la conección solo queda el envío de la respuesta de la petición, que solo consiste en un write que envía la respuesta (de tipo response) por el socket hasta el destino, este se tiene que encargar de gestionar la salida.

```typescript
1    connection.write(JSON.stringify(response) + '\n');
2    connection.end();
3    wholeData = wholeData.substring(messageLimit + 1);
4    messageLimit = wholeData.indexOf('\n');
```

A continuación el cliente recibe el mensaje por parte del servidor y gestiona su entrada del mismo modo que el servidor, con el uso de un salto de línea para saber cuando se ha recibido el mensaje completo.

```typescript
1    let wholeData = '';
2    client.on('data', (dataChunk) => {
3      wholeData += dataChunk;
4      let messageLimit = wholeData.indexOf('\n');
5      while (messageLimit !== -1) {
6        const message = wholeData.substring(0, messageLimit);
7        const accion = JSON.parse(message.toString());
```

Desde este lado también se maneja la salida gracias a un switch. El primer caso que gestiona es en el que se recibe un mensaje de tipo add, dependiendo del atributo success la respuesta se imprimirá en verde o en rojo.

```typescript
1    case 'Add':
2      if(accion.success) {
3        console.log(chalk.green(`Nuevo Funko agregado en la colección de ${usuario}.`));
4      } else {
5        console.log(chalk.red(`El funko ya existe en la colección de ${usuario}.`));
6      }
7      break;
```

Lo mismo ocurre con el caso de eliminar un funko.

```typescript
1    case 'Remove':
2      if(accion.success) {
3        console.log(chalk.green(`Funko eliminado de la colección de ${usuario}.`));
4      } else {
5        console.log(chalk.red(`El funko no existe en la colección de ${usuario} o el usuario ${usuario} no existe.`));
6      }
7      break;
```

Y con el de modificar un funko.

```typescript
1    case 'Update':
2      if(accion.success) {
3        console.log(chalk.green(`Funko actualizado en la colección de ${usuario}.`));
4      } else {
5        console.log(chalk.red(`El funko no existe en la colección de ${usuario} o el usuario ${usuario} no existe.`));
6      }
7      break;
```

Para el caso de mostrar la información de un funko la cosa cambia un poco. En este caso si el atributo success se encuentra en falso, se imprime el mensaje en rojo, en caso contrario se rescata el funko desde el objeto JSON y se imprime por pantalla gracias al uso de la función toString().

```typescript
1    case 'Read':
2      if(accion.success) {
3        const mostrarFunko = new Funko(accion.funkos[0].id, accion.funkos[0].nombre, accion.funkos[0].descripcion, accion.funkos[0].tipo, accion.funkos[0].genero,
4          accion.funkos[0].franquicia, accion.funkos[0].numero, accion.funkos[0].exclusivo, accion.funkos[0].caracteristicas, accion.funkos[0].valor);
5        console.log(mostrarFunko.toString());
6      } else {
7        console.log(chalk.red(`El funko no existe en la colección de ${usuario} o el usuario ${usuario} no existe.`));
8      }
9      break;
```

Lo mismo ocurre con el método que imprime la lista de funkos de un usuario, solo que esta vez se rescata el vector de funkos y se va imprimiendo uno a uno.

```typescript
1    case 'List':
2      if(accion.success) {
3        for(let i = 0; i < accion.funkos.length; i++) {
4          const mostrarFunko = new Funko(accion.funkos[i].id, accion.funkos[i].nombre, accion.funkos[i].descripcion, accion.funkos[i].tipo, accion.funkos[i].5genero,
6            accion.funkos[i].franquicia, accion.funkos[i].numero, accion.funkos[i].exclusivo, accion.funkos[i].caracteristicas, accion.funkos[i].valor);
7            console.log(mostrarFunko.toString());
8          }
9      } else {
10     console.log(chalk.red(`El usuario ${usuario} no existe.`));
11   }
12   break;
```



### Modificación

Para la modificación planteé la siguiente solución: tendremos un cliente y un servidor, el cliente toma el comando que se quiere ejecutar gracias a los parámetros que se pasan en la ejecución del programa, los almacena en una variable comando y los transforma en un string JSON, esta cadena se enviará a través del socket al servidor que está conectado, escuchando, gracias al comando write. En la línea 4, se define un manejador que se ejecutará cuando el servidor envíe datos al cliente, en este caso, el servidor envía el resultado de la ejecución del comando, es decir, lo que se debería imprimir por pantalla, para que el cliente lo imprima. Finalmente, se cierra la conexión con el servidor, pero esto se realiza de una manera un poco más compleja, la cual explicará a continuación.

```typescript
1    const client = net.connect({port: socketNumber}, () => {
2      const comando = JSON.stringify({'comando': process.argv[2], 'argumentos': process.argv.slice(3)});
3      client.write(comando);
4      client.on('data', (data) => {
5        console.log(data.toString());
6      });
7      client.end();
8    });
```

En el otro lado, se crea el servidor con la ayuda de la función createServer, y con un parámetro especial llamado allowHalfOpen, el cual permite que la conexión se mantenga abierta, para que el servidor pueda enviar datos al cliente, es comosi el canal se particionara en dos, uno para enviar y otro para recibir, por lo que si el cliente hace un end, el servidor puede seguir enviando datos. Además se realiza la recepción del mensaje JSON, para el cual debemos definir un manejador que escuche todo lo que transmite el cliente a través del socket, almacenándolo en la variable wholeData.

```typescript
1    net.createServer({allowHalfOpen: true}, (connection) => {
2      let wholeData = '';
3      connection.on('data', (dataChunk) => {
4        wholeData += dataChunk;
5      });
```

A continuación se queda a la espera de que el cliente cierre la conexión. Para poder ejecutar el comando, se parsea el JSON y se ejecuta con la ayuda de la función exec, que recibe como parámetros el comando y los argumentos, además de un callback que se ejecutará cuando se termine de ejecutar el comando. En el caso de que el comando de un error, se gestiona con el parámetro que recibe el callback `error` y la salida del error con el parámetro `stderr`. En caso contrario, se imprime la salida del comando gracias a la ayuda del parámetro `stdout` y se cierra la conexión con el cliente.

```typescript
1    connection.on('end', () => {
2       const comando = JSON.parse(wholeData.toString());
3       const ejecutar = comando.comando + ' ' + comando.argumentos.join(' ');
4       exec(ejecutar, (error, stdout, stderr) => {
5         if (error) {
6           // Aquí manejamos los posibles errores de ejecución
7           connection.write(`Error al ejecutar el comando: ${stderr}\n`);
8         } else {
9           // Aquí devolvemos la salida del comando al cliente
10          connection.write(stdout);
11          connection.end();
12        }
13      });
14    });
```

### Conclusión

En conclusión tengo que decir que se me hizo muy difícil la realización de esta práctica porque se sumaron muchos factores que me dificultaron el desarrollo de la misma. Por un lado, el tema de los sockets es bastante complejo y me costó entenderlo, por lo que tuve que dedicar más tiempo que en otras prácticas para entender bien el temario. Por otro lado, está siendo un final de cuatrimestre muy cargado de trabajo y no le pude dedicar el tiempo que quería a la práctica, es por eso que los ejercicios 2 y 3 no están como me gustarían. A pesar de ello, no quería dejar de lado la práctica y saqué un poco de tiempo para ella. En cuanto al temario en sí, me parece algo muy útil y realista, porque al fin y al cabo es algo que empleamos en nuestro día a día al hacer peticiones en la web.


### Bibliografía

[Tutorial de las estructuras de datos que utiliza JS](https://dev.to/lydiahallie/javascript-visualized-event-loop-3dif)

[Información sobre la función access](https://www.geeksforgeeks.org/node-js-fs-access-method/)

[Información sobre allowHalfOpen](https://nodejs.org/api/net.html#netcreateserveroptions-connectionlistener)