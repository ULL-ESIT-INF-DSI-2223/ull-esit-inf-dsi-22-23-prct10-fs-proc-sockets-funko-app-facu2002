import net from 'net';
import { ResponseType } from './types.js';
import { Funko } from './funko/funko.js';
import { ManejadorJSON } from './funko/manejadorJSON.js';

/**
 * Creación del proceso servidor
 */
net.createServer((connection) => {
  let wholeData = '';
  connection.on('data', (dataChunk) => {
    wholeData += dataChunk;
    let messageLimit = wholeData.indexOf('\n');
    while (messageLimit !== -1) {
      const message = wholeData.substring(0, messageLimit);
      const accion = JSON.parse(message.toString());
      let funko: Funko;
      let response: ResponseType = { type: '', success: false, usuario: "", idFunko: 0, funkos: [] };
      switch (accion.type) {
        case 'Add':
          funko = new Funko(accion.funko[0].id, accion.funko[0].nombre, accion.funko[0].descripcion, accion.funko[0].tipo, accion.funko[0].genero,
                  accion.funko[0].franquicia, accion.funko[0].numero, accion.funko[0].exclusivo, accion.funko[0].caracteristicas, accion.funko[0].valor);
          if(ManejadorJSON.agregarFunkoDB(funko, accion.usuario)) {
            response = { type: 'Add', success: true, usuario: accion.usuario, idFunko: funko.Id, funkos: [funko] };
          } else {
            response = { type: 'Add', success: false, usuario: accion.usuario, idFunko: funko.Id, funkos: [funko] };
          }
          break;
        case 'Remove':
          if(ManejadorJSON.eliminarFunkoDB(accion.idFunko, accion.usuario)) {
            response = { type: 'Remove', success: true, usuario: accion.usuario, idFunko: accion.idFunko, funkos: [] };
          } else {
            response = { type: 'Remove', success: false, usuario: accion.usuario, idFunko: accion.idFunko, funkos: [] };
          }
          break;
        case 'Update':
          funko = new Funko(accion.funko[0].id, accion.funko[0].nombre, accion.funko[0].descripcion, accion.funko[0].tipo, accion.funko[0].genero,
            accion.funko[0].franquicia, accion.funko[0].numero, accion.funko[0].exclusivo, accion.funko[0].caracteristicas, accion.funko[0].valor);
          if(ManejadorJSON.modificarFunkoDB(funko, accion.usuario)) {
            response = { type: 'Update', success: true, usuario: accion.usuario, idFunko: funko.Id, funkos: [funko] };
          } else {
            response = { type: 'Update', success: false, usuario: accion.usuario, idFunko: funko.Id, funkos: [funko] };
          }
          break;
        case 'List':
          if(ManejadorJSON.listarFunkoDB(accion.usuario).length === 0) {
            response = { type: 'List', success: false, usuario: accion.usuario, idFunko: accion.idFunko, funkos: [] };
          } else {
            const vectorFunkos = ManejadorJSON.listarFunkoDB(accion.usuario);
            response = { type: 'List', success: true, usuario: accion.usuario, idFunko: accion.idFunko, funkos: vectorFunkos };
          }
          break;
        case 'Read':
          if(ManejadorJSON.mostrarFunkoDB(accion.idFunko, accion.usuario).length === 0) {
            response = { type: 'Read', success: false, usuario: accion.usuario, idFunko: accion.idFunko, funkos: [] };
          } else {
            const readFunko = ManejadorJSON.mostrarFunkoDB(accion.idFunko, accion.usuario);
            response = { type: 'Read', success: true, usuario: accion.usuario, idFunko: accion.idFunko, funkos: readFunko };
          }
          break;
        default:
          break;
        }

      
      connection.write(JSON.stringify(response) + '\n');
      connection.end();
      wholeData = wholeData.substring(messageLimit + 1);
      messageLimit = wholeData.indexOf('\n');
    }

  });

}).listen(60300, () => {
  console.log('Waiting for clients to connect.');
});