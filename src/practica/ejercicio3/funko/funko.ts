import { TipoFunko, GeneroFunko } from "./enumerados.js";
import chalk from 'chalk';


/**
 * Clase Funko, representa una figura Funko Pop
 */
export class Funko {
  
  /**
   * Constructor de la clase Funko
   * @param id identificador del funko
   * @param nombre nombre del funko
   * @param descripcion pequeña descripción del funko
   * @param tipo tipo de funko que debe ser un elemento del enumerado TipoFunko
   * @param genero género de funko que debe ser un elemento del enumerado GeneroFunko
   * @param franquicia nombre de la franquicia a la que pertenece el funko
   * @param numero número de la franquicia a la que pertenece el funko
   * @param exclusivo valor que determina si el funko es exclusivo
   * @param caracteristicas distintas características del funko
   * @param valor valor en el mercado del funko
   */
  constructor(private id: number, private nombre: string, private descripcion: string, private tipo: TipoFunko, private genero: GeneroFunko,
    private franquicia: string, private numero: number, private exclusivo: boolean, private caracteristicas: string, private valor: number) {
  }

  /**
   * Getter de la propiedad id
   */
  get Id(): number { return this.id; }

  /**
   * Getter de la propiedad nombre
   */
  get Nombre(): string { return this.nombre; }

  /**
   * Getter de la propiedad descripcion
   */
  get Valor(): number { return this.valor; }


  /**
   * Método que devuelve la información del funko en forma de cadena
   * @returns información del funko
   */
  public toString(): string {
    let info = chalk.white(`ID : ${this.id}\n`);
    info += chalk.white(`Nombre : ${this.nombre}\n`);
    info += chalk.white(`Descripción : ${this.descripcion}\n`);
    info += chalk.white(`Tipo : ${this.tipo}\n`);
    info += chalk.white(`Género : ${this.genero}\n`);
    info += chalk.white(`Franquicia : ${this.franquicia}\n`);
    info += chalk.white(`Número de franquicia : ${this.numero}\n`);
    info += chalk.white(`Exclusivo : ${this.exclusivo}\n`);
    info += chalk.white(`Características : ${this.caracteristicas}\n`);
    if(this.valor >= 0 && this.valor < 20) {
      info += `Valor : ` + chalk.red(`${this.valor}\n`);
    } else if (this.valor >= 20 && this.valor < 50) {
      info += `Valor : ` + chalk.green(`${this.valor}\n`);
    } else if (this.valor >= 50 && this.valor < 100) {
      info += `Valor : ` + chalk.yellow(`${this.valor}\n`);
    } else if (this.valor >= 100) {
      info += `Valor : ` + chalk.blue(`${this.valor}\n`);
    } else {
      info += `Valor : ` + chalk.white(`Valor inválido\n`);
    }
    return info;
  }
}