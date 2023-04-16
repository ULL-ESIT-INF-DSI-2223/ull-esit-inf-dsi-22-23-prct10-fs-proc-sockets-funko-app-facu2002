import { exec } from 'child_process';
import net from 'net';

export class Server {
  /**
   * Constructor de la clase Server
   * @param socketNumber número de socket
   */
  constructor(socketNumber: number) { 
    net.createServer({allowHalfOpen: true}, (connection) => {
      let wholeData = '';
      // Nos aseguramos que el mensaje viene completo y no se particiona
      connection.on('data', (dataChunk) => {
        wholeData += dataChunk;
      });

      // Una vez recibido el mensaje completo, lo ejecutamos en el servidor
      connection.on('end', () => {
        const comando = JSON.parse(wholeData.toString());
        const ejecutar = comando.comando + ' ' + comando.argumentos.join(' ');
        exec(ejecutar, (error, stdout, stderr) => {
          if (error) {
            // Aquí manejamos los posibles errores de ejecución
            connection.write(`Error al ejecutar el comando: ${stderr}\n`);
          } else {
            // Aquí devolvemos la salida del comando al cliente
            connection.write(stdout);
            connection.end();
          }
        });
      });
    }).listen(socketNumber, () => {
      console.log('Waiting for clients to connect.');
    });
  }
}

// const server = new Server(60300);