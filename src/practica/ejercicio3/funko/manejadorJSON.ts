import { TipoFunko, GeneroFunko } from './enumerados.js';
import { Funko } from './funko.js';
import fs from 'fs';


/**
 * Clase ManejadorJSON
 */
export abstract class ManejadorJSON {

  /**
   * Método estático que determina si existe o no un usuario
   * @param usuario usuario a buscar
   * @param testing booleano que indica si se está en modo testing
   * @returns booleano que indica si existe o no el usuario
   */
  public static existeUsuario(usuario: string, testing?: boolean): boolean {
    if(testing === undefined || testing === false) {
      return fs.existsSync('./db/' + usuario);
    } else if (testing === true) {
      return fs.existsSync('./dbTesting/' + usuario);
    }
    return false;
  }

  /**
   * Método estático que devuelve una lista de funkos de un usuario
   * @param usuario usuario del que se extraen los funkos
   * @param testing booleano que indica si se está en modo testing
   * @returns lista de funkos
   */
  public static extraerFunkos(usuario: string, testing?: boolean): Funko[] {
    const listaFunkos: Funko[] = [];
    let listaFicheros: string[] = [];
    if(testing === undefined || testing === false) {
      listaFicheros = fs.readdirSync('./db/' + usuario + '/');
    } else if (testing === true) {
      listaFicheros = fs.readdirSync('./dbTesting/' + usuario + '/');
    }
    for (const fichero of listaFicheros) {
      let funko;
      if(testing === undefined || testing === false) {
        funko = JSON.parse(fs.readFileSync('./db/' + usuario + '/' + fichero, 'utf-8'));
      } else if (testing === true) {
        funko = JSON.parse(fs.readFileSync('./dbTesting/' + usuario + '/' + fichero, 'utf-8'));
      }
      listaFunkos.push(Object.assign(new Funko(0, '', '', TipoFunko.Pop, GeneroFunko.Normal, '', 0, false, '', 0), funko));
    }
    return listaFunkos;
  }

  /**
   * Método estático que determina si existe o no un funko en la lista de funkos de un usuario
   * @param usuario usuario del que se extraen los funkos
   * @param idFunko funko a buscar
   * @param testing booleano que indica si se está en modo testing
   * @returns booleano que indica si existe o no el funko
   */
  public static existeFunko(usuario: string, idFunko: number, testing?: boolean): boolean {
    const listaFunkos = ManejadorJSON.extraerFunkos(usuario, testing);
    for(const funkoLista of listaFunkos) {
      if(funkoLista.Id === idFunko) {
        return true;
      }
    }
    return false;
  }

  /**
   * Método estático que devuelve un funko de la lista de funkos de un usuario
   * @param usuario usuario del que se extraen los funkos
   * @param idFunko funko a buscar
   * @param testing booleano que indica si se está en modo testing
   * @returns objeto funko o null si no existe
   */
  public static getFunko(usuario: string, idFunko: number, testing?: boolean): Funko | null {
    const listaFunkos = ManejadorJSON.extraerFunkos(usuario, testing);
    for(const funkoLista of listaFunkos) {
      if(funkoLista.Id === idFunko) {
        return funkoLista;
      }
    }
    return null;
  }

  /**
   * Método estático que permite agregar un funko a la lista de funkos de un usuario
   * @param funko funko a agregar
   * @param usuario usuario al que se le agrega el funko
   * @param testing booleano que indica si se está en modo testing
   * @returns booleano que indica si se ha agregado o no el funko
   */
  public static agregarFunkoDB(funko: Funko, usuario: string, testing?: boolean): boolean {
    if(ManejadorJSON.existeUsuario(usuario, testing)) {
      if(ManejadorJSON.existeFunko(usuario, funko.Id, testing)) {
        return false;
      } else {
        if(testing === undefined || testing === false) {
          fs.writeFileSync('./db/' + usuario + '/' + funko.Nombre + '.json', JSON.stringify(funko));
          return true;
        } else if (testing === true) {
          fs.writeFileSync('./dbTesting/' + usuario + '/' + funko.Nombre + '.json', JSON.stringify(funko));
          return true;
        }
      }
    } else {
      if(testing === undefined || testing === false) {
        fs.mkdirSync('./db/' + usuario + '/');
        fs.writeFileSync('./db/' + usuario + '/' + funko.Nombre + '.json', JSON.stringify(funko));
        return true;
      } else if (testing === true) {
        fs.mkdirSync('./dbTesting/' + usuario + '/');
        fs.writeFileSync('./dbTesting/' + usuario + '/' + funko.Nombre + '.json', JSON.stringify(funko));
        return true;
      }
    }
    return false;
  }

  /**
   * Método estático que permite eliminar un funko de la lista de funkos de un usuario
   * @param idFunko funko a eliminar
   * @param usuario usuario del que se elimina el funko
   * @param testing booleano que indica si se está en modo testing
   * @returns booleano que indica si se ha eliminado o no el funko
   */
  public static eliminarFunkoDB(idFunko: number, usuario: string, testing?: boolean): boolean {
    if(ManejadorJSON.existeUsuario(usuario, testing)) {
      if(ManejadorJSON.existeFunko(usuario, idFunko, testing)) {
        const funkoEliminado = ManejadorJSON.getFunko(usuario, idFunko, testing);
        if(funkoEliminado !== null) {
          if(testing === undefined || testing === false) {
            fs.unlinkSync('./db/' + usuario + '/' + funkoEliminado.Nombre + '.json');
          } else {
            fs.unlinkSync('./dbTesting/' + usuario + '/' + funkoEliminado.Nombre + '.json');
          }
        }
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
 

  /**
   * Método estático que permite modificar un funko de la lista de funkos de un usuario
   * @param funko funko con los valores modificados
   * @param usuario usuario del que se modifica el funko
   * @param testing variable que indica si se está en modo testing
   * @returns booleano que indica si se ha modificado o no el funko
   */
  public static modificarFunkoDB(funko: Funko, usuario: string, testing?: boolean): boolean {
    if(ManejadorJSON.existeUsuario(usuario, testing)) {
      if(ManejadorJSON.existeFunko(usuario, funko.Id, testing)) {
        const funkoEliminado = ManejadorJSON.getFunko(usuario, funko.Id, testing);
        if(funkoEliminado !== null) {
          if(testing === undefined || testing === false) {
            fs.unlinkSync('./db/' + usuario + '/' + funkoEliminado.Nombre + '.json');
          } else if (testing === true) {
            fs.unlinkSync('./dbTesting/' + usuario + '/' + funkoEliminado.Nombre + '.json');
          }
        }
        if(testing === undefined || testing === false) {
          fs.writeFileSync('./db/' + usuario + '/' + funko.Nombre + '.json', JSON.stringify(funko));
        } else if (testing === true) {
          fs.writeFileSync('./dbTesting/' + usuario + '/' + funko.Nombre + '.json', JSON.stringify(funko));
        }
      } else {
        return false;
      }
      return true;
    } else {
      return false;
    }
    return false;
  }


  /**
   * Método estático que permite listar los funkos de un usuario
   * @param usuario usuario del que se extraen los funkos
   * @param testing booleano que indica si se está en modo testing
   * @returns booleano que indica si se ha listado o no los funkos
   */
  public static listarFunkoDB(usuario: string, testing?: boolean): Funko[] {
    if(ManejadorJSON.existeUsuario(usuario, testing)) {
      const listaFunkos = ManejadorJSON.extraerFunkos(usuario, testing);
      const vectorFunkos: Funko[] = [];
      for(const funko of listaFunkos) {
        vectorFunkos.push(funko);
      }
      return vectorFunkos;
    } else {
      return [];
    }
  }


  /**
   * Método estático que permite mostrar un funko de un usuario
   * @param idFunko funko a mostrar
   * @param usuario usuario del que se extrae el funko
   * @param testing booleano que indica si se está en modo testing
   * @returns booleano que indica si se ha mostrado o no el funko
   */
  public static mostrarFunkoDB(idFunko: number, usuario: string, testing?: boolean): Funko[] {
    if(ManejadorJSON.existeUsuario(usuario, testing)) {
      if(ManejadorJSON.existeFunko(usuario, idFunko, testing)) {
        const funko = ManejadorJSON.getFunko(usuario, idFunko, testing);
        if(funko !== null) {
          return [funko];
        }
        return [];
      } else {
        return [];
      }
    } else {
      return [];
    }
  }
}