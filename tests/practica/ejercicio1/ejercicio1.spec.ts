import 'mocha';
import { expect } from 'chai';
import { hola } from '../../../src/practica/ejercicio1/ejercicio1.js';


describe('funcion hola de prueba', () => {
  it('retorna la cadena "hola mundo"', () => {
    expect(hola()).to.be.equal("Hola mundo");
  });
});