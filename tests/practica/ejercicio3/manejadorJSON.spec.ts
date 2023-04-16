import "mocha";
import { expect } from "chai";
import { ManejadorJSON } from "../../../src/practica/ejercicio3/funko/manejadorJSON.js";
import { Funko } from "../../../src/practica/ejercicio3/funko/funko.js";
import { TipoFunko, GeneroFunko } from "../../../src/practica/ejercicio3/funko/enumerados.js";

//tsc --outDir dist && node dist/practica/index.js add --usuario "facundo" --id 1 --nombre "Funko1" --descripcion "Funko1" --tipo "Pop" --genero "Normal" --franquicia "Mercadona" --numero 1 --exclusivo true --caracteristicas "Brilla" --valor 10 --testing true
//tsc --outDir dist && node dist/practica/index.js add --usuario "facundo" --id 2 --nombre "Funko2" --descripcion "Funko2" --tipo "Pop" --genero "Normal" --franquicia "Mercadona" --numero 1 --exclusivo true --caracteristicas "Brilla" --valor 25 --testing true
//tsc --outDir dist && node dist/practica/index.js add --usuario "facundo" --id 3 --nombre "Funko3" --descripcion "Funko3" --tipo "Pop" --genero "Normal" --franquicia "Mercadona" --numero 1 --exclusivo true --caracteristicas "Brilla" --valor 80 --testing true
//tsc --outDir dist && node dist/practica/index.js add --usuario "facundo" --id 4 --nombre "Funko4" --descripcion "Funko4" --tipo "Pop" --genero "Normal" --franquicia "Mercadona" --numero 1 --exclusivo true --caracteristicas "Brilla" --valor 200 --testing true


const funko1 = new Funko(1, "Funko1", "Funko1", TipoFunko.Pop, GeneroFunko.Normal, "Mercadona", 1, true, "Brilla", 10);
const funko2 = new Funko(2, "Funko2", "Funko2", TipoFunko.Pop, GeneroFunko.Normal, "Mercadona", 1, true, "Brilla", 25);
const funko3 = new Funko(3, "Funko3", "Funko3", TipoFunko.Pop, GeneroFunko.Normal, "Mercadona", 1, true, "Brilla", 80);
const funko4 = new Funko(4, "Funko4", "Funko4", TipoFunko.Pop, GeneroFunko.Normal, "Mercadona", 1, true, "Brilla", 200);
const funko5 = new Funko(5, "Funko5", "Funko5", TipoFunko.Pop, GeneroFunko.Normal, "Mercadona", 1, true, "Brilla", 200);


describe("Clase ManejadorJSON ", () => {
  it("existeUsuario : método que determina si un usuario se encuentra en la base de datos", () => {
    expect(ManejadorJSON.existeUsuario('facundo', true)).to.be.equal(true);
    expect(ManejadorJSON.existeUsuario('pepe', true)).to.be.equal(false);
  });
  it("extraerFunkos : método que obtiene de la base de datos la lista de funkos de un usuario", () => {
    ManejadorJSON.eliminarFunkoDB(5, 'facundo', true);
    expect(ManejadorJSON.extraerFunkos('facundo', true)).to.be.eql([funko1, funko2, funko3, funko4]);
  });
  it("existeFunko : método que determina si un funko se encuentra en la base de datos de un usuario", () => {
    expect(ManejadorJSON.existeFunko('facundo', 1, true)).to.be.equal(true);
    expect(ManejadorJSON.existeFunko('facundo', 2, true)).to.be.equal(true);
    expect(ManejadorJSON.existeFunko('facundo', 3, true)).to.be.equal(true);
    expect(ManejadorJSON.existeFunko('facundo', 4, true)).to.be.equal(true);
    expect(ManejadorJSON.existeFunko('facundo', 5, true)).to.be.equal(false);
  });
  it("getFunko : método que obtiene un objeto funko de la base de datos de un usuario", () => {
    expect(ManejadorJSON.getFunko('facundo', 1, true)).to.be.eql(funko1);
    expect(ManejadorJSON.getFunko('facundo', 2, true)).to.be.eql(funko2);
    expect(ManejadorJSON.getFunko('facundo', 3, true)).to.be.eql(funko3);
    expect(ManejadorJSON.getFunko('facundo', 4, true)).to.be.eql(funko4);
    expect(ManejadorJSON.getFunko('facundo', 5, true)).to.be.eql(null);
  });
  it("agregarFunkoDB : método que agrega un funko en la base de datos de un usuario", () => {
    expect(ManejadorJSON.agregarFunkoDB(funko5, 'facundo', true)).to.be.equal(true);
    expect(ManejadorJSON.agregarFunkoDB(funko5, 'facundo', true)).to.be.equal(false);
  });
  it("eliminarFunkoDB : método que elimina un funko de la base de datos de un usuario", () => {
    expect(ManejadorJSON.eliminarFunkoDB(5, 'facundo', true)).to.be.equal(true);
    expect(ManejadorJSON.eliminarFunkoDB(6, 'facundo', true)).to.be.equal(false);
  });
  it("listarFunkoDB : método que muestra por pantalla los funkos de un usuario", () => {
    expect(ManejadorJSON.listarFunkoDB('facundo', true)).to.be.eql([funko1, funko2, funko3, funko4]);
    expect(ManejadorJSON.listarFunkoDB('pepe', true)).to.be.eql([]);
  });
  it("mostrarFunkoDB : método que muestra por pantalla un funko de un usuario", () => {
    expect(ManejadorJSON.mostrarFunkoDB(4, 'facundo', true)).to.be.eql([funko4]);
    expect(ManejadorJSON.mostrarFunkoDB(5, 'facundo', true)).to.be.eql([]);
  });
});
