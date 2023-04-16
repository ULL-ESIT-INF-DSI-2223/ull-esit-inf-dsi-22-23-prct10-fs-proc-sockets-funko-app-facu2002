import net from 'net';

export class Client {
  /**
   * Constructor de la clase Client
   * @param socketNumber número de socket
   */
  constructor(socketNumber: number) {
    const client = net.connect({port: socketNumber}, () => {
      const comando = JSON.stringify({'comando': process.argv[2], 'argumentos': process.argv.slice(3)});
      client.write(comando);
      client.on('data', (data) => {
        console.log(data.toString());
      });
      client.end();
    });
  }
}


// const client = new Client(60300);