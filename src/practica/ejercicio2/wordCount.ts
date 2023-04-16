import yargs from 'yargs';
import { spawn } from 'child_process';
import { hideBin } from 'yargs/helpers';


/**
 * Comando para contar líneas, palabras y caracteres de un fichero
 */
yargs(hideBin(process.argv))
.command('WC', 'Muestra la información de un fichero', {
fichero: {
  description: 'Nombre del fichero del que se extrae la información',
  type: 'string',
  demandOption: true
},
lineas: {
  description: 'Saca el número de líneas del fichero',
  type: 'boolean',
  demandOption: false
},
palabras: {
  description: 'Saca el número de palabras del fichero',
  type: 'boolean',
  demandOption: false
},
caracteres: {
  description: 'Saca el número de caracteres del fichero',
  type: 'boolean',
  demandOption: false
}
}, (argv) => {
  imprimirContador(argv.fichero, argv.lineas, argv.palabras, argv.caracteres);
})
.help()
.argv;


/**
 * Función que imprime el número de líneas, palabras y caracteres de un fichero
 * @param nombreFichero nombre del fichero del que se extrae la información
 * @param contarLineas booleano que indica si se debe contar el número de líneas
 * @param contarPalabras booleano que indica si se debe contar el número de palabras
 * @param contarCaracteres booleano que indica si se debe contar el número de caracteres
 */
export function imprimirContador(nombreFichero: string, contarLineas?: boolean, contarPalabras?: boolean, contarCaracteres?: boolean) {
  // En el caso de no pasar ningún parámetro, se contarán todas las opciones
  if(contarLineas == undefined && contarPalabras == undefined && contarCaracteres == undefined) {
    contarLineas = true; contarPalabras = true; contarCaracteres = true;
  }
  if(contarLineas === true) {  imprimirLineasFichero(nombreFichero) }
  if(contarPalabras === true) { imprimirPalabrasFichero(nombreFichero); }
  if(contarCaracteres === true) { imprimirCaracteresFichero(nombreFichero); }
}

/**
 * Función que imprime el número de líneas de un fichero sin la utilización de pipes
 * @param nombreFichero nombre del fichero del que se extrae la información
 */
export function imprimirLineasFichero(nombreFichero: string) : void {
  const wc = spawn('wc', ['-l', nombreFichero]);

  let wcSalida = '';
  wc.stdout.on('data', (piece) => wcSalida += piece);

  wc.on('close', () => {
    const wcSalidaArray = wcSalida.split(/\s+/);
    console.log(`Número de líneas : ${wcSalidaArray[0]}`);
  });
}


/**
 * Función que imprime el número de palabras de un fichero sin la utilización de pipes
 * @param nombreFichero nombre del fichero del que se extrae la información
 */
export function imprimirPalabrasFichero(nombreFichero: string) : void {
  const wc = spawn('wc', ['-w', nombreFichero]);

  let wcSalida = '';
  wc.stdout.on('data', (piece) => wcSalida += piece);

  wc.on('close', () => {
    const wcSalidaArray = wcSalida.split(/\s+/);
    console.log(`Número de palabras : ${wcSalidaArray[0]}`);
  });
}


/**
 * Función que imprime el número de caracteres de un fichero sin la utilización de pipes
 * @param nombreFichero nombre del fichero del que se extrae la información
 */
export function imprimirCaracteresFichero(nombreFichero: string) : void {
  const wc = spawn('wc', ['-c', nombreFichero]);

  let wcSalida = '';
  wc.stdout.on('data', (piece) => wcSalida += piece);

  wc.on('close', () => {
    const wcSalidaArray = wcSalida.split(/\s+/);
    console.log(`Número de caracteres : ${wcSalidaArray[0]}`);
  });
}