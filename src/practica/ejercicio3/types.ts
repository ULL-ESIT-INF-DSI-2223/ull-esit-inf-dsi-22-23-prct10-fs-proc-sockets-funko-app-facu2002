import { Funko } from './funko/funko.js';

/**
 * Enumerado con las acciones que se pueden realizar con los Funkos
 */
export enum Action { 
  "Add" = "Add",
  "Remove" = "Remove",
  "List" = "List",
  "Update" = "Update",
  "Read" = "Read"
}

/**
 * Enumerado con el tipo de mensaje request que se pueden enviar
 */
export type RequestType = {
  type: string;
  usuario?: string;
  idFunko?: number;
  funko?: Funko[];
}
 
/**
 * Enumerado con el tipo de mensaje response que se pueden enviar
 */ 
export type ResponseType = {
  type: string;
  usuario?: string;
  success: boolean;
  idFunko?: number;
  funkos?: Funko[];
}