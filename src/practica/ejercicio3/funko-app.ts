import net from 'net';
import { RequestType, Action } from './types.js';
import { Funko } from './funko/funko.js';
import { tipoFunko, generoFunko } from './funko/enumerados.js';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import chalk from "chalk";


let funko: Funko;
let id: number;
let usuario: string;
let accion: string;

/**
 * Comando para agregar un funko a la colección de un usuario
 */
yargs(hideBin(process.argv))
  .command('add', 'Agrega un funko a la colección del usuario', {
    usuario: {
      description: 'Nombre de usuario',
      type: 'string',
      demandOption: true
    },
    id: {
     description: 'ID del funko',
     type: 'number',
     demandOption: true
    },
    nombre: {
      description: 'Nombre del funko',
      type: 'string',
      demandOption: true
    },
    descripcion: {
      description: 'Descripción del funko',
      type: 'string',
      demandOption: true
    },
    tipo: {
      description: 'Tipo del funko',
      type: 'string',
      demandOption: true
    },
    genero: {
      description: 'Género del funko',
      type: 'string',
      demandOption: true
    },
    franquicia: {
      description: 'Franquicia del funko',
      type: 'string',
      demandOption: true
    },
    numero: {
      description: 'Número de franquicia del funko',
      type: 'number',
      demandOption: true
    },
    exclusivo: {
      description: 'Determina si un funko es exclusivo',
      type: 'boolean',
      demandOption: true
    },
    caracteristicas: {
      description: 'Características del funko',
      type: 'string',
      demandOption: true
    },
    valor: {
      description: 'Valor de mercado del funko',
      type: 'number',
      demandOption: true
    },
    testing: {
      description: 'Determina si se están ejecutando las pruebas',
      type: 'boolean',
      demandOption: false
    }
    }, (argv) => {
      funko = new Funko(argv.id, argv.nombre, argv.descripcion, tipoFunko(argv.tipo), generoFunko(argv.genero), argv.franquicia, argv.numero, argv.exclusivo, argv.caracteristicas, argv.valor);
      id = argv.id;
      usuario = argv.usuario;
      accion = Action.Add;
    })
 .help()
 .argv;

 
 /**
  * Comando para eliminar un funko de un usuario
  */
 yargs(hideBin(process.argv))
   .command('remove', 'Elimina un funko de un usuario', {
   usuario: {
     description: 'Nombre de usuario',
     type: 'string',
     demandOption: true
   },
   id: {
     description: 'ID del funko que se quiere eliminar',
     type: 'number',
     demandOption: true
   },
   testing: {
     description: 'Determina si se están ejecutando las pruebas',
     type: 'boolean',
     demandOption: false
   }
   }, (argv) => {
      id = argv.id;
      usuario = argv.usuario;
      accion = Action.Remove;
   })
 .help()
 .argv;


/**
 * Comando para modificar un funko de un usuario
 */
yargs(hideBin(process.argv))
  .command('update', 'Modifica un funko de la colección del usuario', {
    usuario: {
      description: 'Nombre de usuario',
      type: 'string',
      demandOption: true
    },
    id: {
     description: 'ID del funko',
     type: 'number',
     demandOption: true
    },
    nombre: {
      description: 'Nombre del funko',
      type: 'string',
      demandOption: true
    },
    descripcion: {
      description: 'Descripción del funko',
      type: 'string',
      demandOption: true
    },
    tipo: {
      description: 'Tipo del funko',
      type: 'string',
      demandOption: true
    },
    genero: {
      description: 'Género del funko',
      type: 'string',
      demandOption: true
    },
    franquicia: {
      description: 'Franquicia del funko',
      type: 'string',
      demandOption: true
    },
    numero: {
      description: 'Número de franquicia del funko',
      type: 'number',
      demandOption: true
    },
    exclusivo: {
      description: 'Determina si un funko es exclusivo',
      type: 'boolean',
      demandOption: true
    },
    caracteristicas: {
      description: 'Características del funko',
      type: 'string',
      demandOption: true
    },
    valor: {
      description: 'Valor de mercado del funko',
      type: 'number',
      demandOption: true
    },
    testing: {
      description: 'Determina si se están ejecutando las pruebas',
      type: 'boolean',
      demandOption: false
    }
    }, (argv) => {
      funko = new Funko(argv.id, argv.nombre, argv.descripcion, tipoFunko(argv.tipo), generoFunko(argv.genero), argv.franquicia, argv.numero, argv.exclusivo, argv.caracteristicas, argv.valor);
      id = argv.id;
      usuario = argv.usuario;
      accion = Action.Update;
    })
 .help()
 .argv;


/**
* Comando para listar los funkos de un usuario
*/
yargs(hideBin(process.argv))
  .command('list', 'Lista los funkos de un usuario', {
  usuario: {
    description: 'Nombre de usuario',
    type: 'string',
    demandOption: true
  },  
  testing: {
    description: 'Determina si se están ejecutando las pruebas',
    type: 'boolean',
    demandOption: false
  }  
  }, (argv) => {
    usuario = argv.usuario;
    accion = Action.List;
  })  
.help()  
.argv;


/**
 * Comando para mostrar un funko de un usuario 
 */
yargs(hideBin(process.argv))
  .command('read', 'Muestra un funko de un usuario', {
  usuario: {
    description: 'Nombre de usuario',
    type: 'string',
    demandOption: true
  },  
  id: {
    description: 'ID del funko que se quiere eliminar',
    type: 'number',
    demandOption: true
  },  
  testing: {
    description: 'Determina si se están ejecutando las pruebas',
    type: 'boolean',
    demandOption: false
  }  
  }, (argv) => {
    id = argv.id;
    usuario = argv.usuario;
    accion = Action.Read;
  })  
.help()  
.argv;


/**
 * Creación del proceso cliente
 */
const client = net.connect({port: 60300}, () => {
  const request: RequestType = {
    type: accion,
    usuario: usuario,
    idFunko: id,
    funko: [funko]
  };

  const comando = JSON.stringify(request) + '\n';
  client.write(comando);

  let wholeData = '';
  client.on('data', (dataChunk) => {
    wholeData += dataChunk;
    let messageLimit = wholeData.indexOf('\n');
    while (messageLimit !== -1) {
      const message = wholeData.substring(0, messageLimit);
      const accion = JSON.parse(message.toString());

      switch (accion.type) {
        case 'Add':
          if(accion.success) {
            console.log(chalk.green(`Nuevo Funko agregado en la colección de ${usuario}.`));
          } else {
            console.log(chalk.red(`El funko ya existe en la colección de ${usuario}.`));
          }
          break;
        case 'Remove':
          if(accion.success) {
            console.log(chalk.green(`Funko eliminado de la colección de ${usuario}.`));
          } else {
            console.log(chalk.red(`El funko no existe en la colección de ${usuario} o el usuario ${usuario} no existe.`));
          }
          break;
        case 'Update':
          if(accion.success) {
            console.log(chalk.green(`Funko actualizado en la colección de ${usuario}.`));
          } else {
            console.log(chalk.red(`El funko no existe en la colección de ${usuario} o el usuario ${usuario} no existe.`));
          }
          break;
        case 'Read':
          if(accion.success) {
            const mostrarFunko = new Funko(accion.funkos[0].id, accion.funkos[0].nombre, accion.funkos[0].descripcion, accion.funkos[0].tipo, accion.funkos[0].genero,
              accion.funkos[0].franquicia, accion.funkos[0].numero, accion.funkos[0].exclusivo, accion.funkos[0].caracteristicas, accion.funkos[0].valor);
            console.log(mostrarFunko.toString());
          } else {
            console.log(chalk.red(`El funko no existe en la colección de ${usuario} o el usuario ${usuario} no existe.`));
          }
          break;
        case 'List':
          if(accion.success) {
            for(let i = 0; i < accion.funkos.length; i++) {
              const mostrarFunko = new Funko(accion.funkos[i].id, accion.funkos[i].nombre, accion.funkos[i].descripcion, accion.funkos[i].tipo, accion.funkos[i].genero,
                accion.funkos[i].franquicia, accion.funkos[i].numero, accion.funkos[i].exclusivo, accion.funkos[i].caracteristicas, accion.funkos[i].valor);
                console.log(mostrarFunko.toString());
              }
          } else {
            console.log(chalk.red(`El usuario ${usuario} no existe.`));
          }
          break;
      }
      wholeData = wholeData.substring(messageLimit + 1);
      messageLimit = wholeData.indexOf('\n');
    }
  });
});
