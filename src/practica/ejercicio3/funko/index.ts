import { Funko } from './funko.js';
// import { TipoFunko, GeneroFunko } from './enumerados/enumerados.js';
// import fs from 'fs';
// import { ManejadorJSON } from './utilidades/manejadorJSON.js';

// const funko = new Funko('Funko', 'Funko de prueba', TipoFunko.PopRides, GeneroFunko.Deportes, 'Franquicia', 1, true, 'Caracteristicas', 1);
// const funko2 = new Funko('Funko2', 'Funko de prueba', TipoFunko.PopRides, GeneroFunko.Deportes, 'Franquicia', 1, true, 'Caracteristicas', 1);


import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { tipoFunko, generoFunko } from './enumerados.js';
import { ManejadorJSON } from './manejadorJSON.js';


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
     const funko = new Funko(argv.id, argv.nombre, argv.descripcion, tipoFunko(argv.tipo), generoFunko(argv.genero), argv.franquicia, argv.numero, argv.exclusivo, argv.caracteristicas, argv.valor);
     ManejadorJSON.agregarFunkoDB(funko, argv.usuario, argv.testing);
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
     ManejadorJSON.eliminarFunkoDB(argv.id, argv.usuario, argv.testing);
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
     const funko = new Funko(argv.id, argv.nombre, argv.descripcion, tipoFunko(argv.tipo), generoFunko(argv.genero), argv.franquicia, argv.numero, argv.exclusivo, argv.caracteristicas, argv.valor);
     ManejadorJSON.modificarFunkoDB(funko, argv.usuario, argv.testing);
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
    ManejadorJSON.listarFunkoDB(argv.usuario, argv.testing);
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
    ManejadorJSON.mostrarFunkoDB(argv.id, argv.usuario, argv.testing);
  })  
.help()  
.argv;

