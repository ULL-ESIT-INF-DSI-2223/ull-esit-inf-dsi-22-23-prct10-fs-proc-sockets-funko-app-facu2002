import net from 'net';


const client = net.connect({port: 60300}, () => {
  const comando = JSON.stringify({'comando': process.argv[2], 'argumentos': [process.argv[3], process.argv[process.argv.length - 1]]});
  client.write(comando);
  client.on('data', (data) => {
    console.log(data.toString());
  });
  client.end();
});