import net from 'net';
import {spawn} from 'child_process';


net.createServer({allowHalfOpen: true}, (connection) => {
  let wholeData = '';
  connection.on('data', (dataChunk) => {
    wholeData += dataChunk;
  });

  connection.on('end', () => {
    const comando = JSON.parse(wholeData.toString());
    const salida = spawn(comando.comando, comando.argumentos);
    salida.stdout.pipe(process.stdout);
    // connection.write();
  });

}).listen(60300, () => {
  console.log('Waiting for clients to connect.');
});