import { spawn } from 'child_process';
import yargs from 'yargs';
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
  imprimirContadorPipe(argv.fichero, argv.lineas, argv.palabras, argv.caracteres);
})
.help()
.argv;


/**
 * Función que imprime el número de líneas, palabras y caracteres de un fichero con la utilización de pipes
 * @param nombreFichero nombre del fichero del que se extrae la información
 * @param contarLineas booleano que indica si se debe contar el número de líneas
 * @param contarPalabras booleano que indica si se debe contar el número de palabras
 * @param contarCaracteres booleano que indica si se debe contar el número de caracteres
 */
export function imprimirContadorPipe(nombreFichero: string, contarLineas?: boolean, contarPalabras?: boolean, contarCaracteres?: boolean) {
  // En el caso de no pasar ningún parámetro, se contarán todas las opciones
  if(contarLineas == undefined && contarPalabras == undefined && contarCaracteres == undefined) {
    contarLineas = true; contarPalabras = true; contarCaracteres = true;
  }
  if(contarLineas === true) {  imprimirLineasFicheroPipe(nombreFichero) }
  if(contarPalabras === true) { imprimirPalabrasFicheroPipe(nombreFichero); }
  if(contarCaracteres === true) { imprimirCaracteresFicheroPipe(nombreFichero); }
}


/**
 * Función que imprime el número de líneas de un fichero con la utilización de pipes
 * @param nombreFichero nombre del fichero del que se extrae la información
 */
export function imprimirLineasFicheroPipe(nombreFichero: string) : void {
  const wc = spawn('wc', ['-l', nombreFichero]);
  console.log("Número de líneas: ");
  wc.stdout.pipe(process.stdout);
}


/**
 * Función que imprime el número de palabras de un fichero con la utilización de pipes
 * @param nombreFichero nombre del fichero del que se extrae la información
 */
export function imprimirPalabrasFicheroPipe(nombreFichero: string) : void {
  const wc = spawn('wc', ['-w', nombreFichero]);
  console.log("Número de palabras: ");
  wc.stdout.pipe(process.stdout);
}


/**
 * Función que imprime el número de caracteres de un fichero con la utilización de pipes
 * @param nombreFichero nombre del fichero del que se extrae la información
 */
export function imprimirCaracteresFicheroPipe(nombreFichero: string) : void {
  const wc = spawn('wc', ['-c', nombreFichero]);
  console.log("Número de caracteres: ");
  wc.stdout.pipe(process.stdout);
}