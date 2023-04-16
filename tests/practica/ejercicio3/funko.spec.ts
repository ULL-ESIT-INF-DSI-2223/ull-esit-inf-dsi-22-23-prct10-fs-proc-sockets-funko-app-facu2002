import "mocha";
import { expect } from "chai";
import { Funko } from "../../../src/practica/ejercicio3/funko/funko.js";
import { TipoFunko, GeneroFunko, tipoFunko, generoFunko } from "../../../src/practica/ejercicio3/funko/enumerados.js";


const funko1 = new Funko(1, "Funko1", "Funko1", TipoFunko.Pop, GeneroFunko.Normal, "Mercadona", 1, true, "Brilla", 10);
const funko2 = new Funko(2, "Funko2", "Funko2", TipoFunko.Pop, GeneroFunko.Normal, "Mercadona", 1, true, "Brilla", 25);
const funko3 = new Funko(3, "Funko3", "Funko3", TipoFunko.Pop, GeneroFunko.Normal, "Mercadona", 1, true, "Brilla", 80);
const funko4 = new Funko(4, "Funko4", "Funko4", TipoFunko.Pop, GeneroFunko.Normal, "Mercadona", 1, true, "Brilla", 200);


describe("Clase Funko ", () => {
  it("Constructor de la clase Funko", () => {
    expect(funko1).to.be.an.instanceOf(Funko);
    expect(funko1).not.to.be.equal(null);
  });
  it("Id : Getter de la propiedad id", () => {
    expect(funko1.Id).to.be.equal(1);
  });
  it("Nombre : Getter de la propiedad nombre", () => {
    expect(funko1.Nombre).to.be.equal("Funko1");
  });
  it("Valor : Getter de la propiedad valor", () => {
    expect(funko1.Valor).to.be.equal(10);
  });
  it("toString : método que devuelve la información de un Funko en forma de string", () => {
    const info1 = funko1.toString(), info2 = funko2.toString(), info3 = funko3.toString(), info4 = funko4.toString();
    expect(funko1.toString()).to.be.equal(info1);
    expect(funko2.toString()).to.be.equal(info2);
    expect(funko3.toString()).to.be.equal(info3);
    expect(funko4.toString()).to.be.equal(info4);
  });
  it("tipoFunko : método que devuelve el tipo de un funko", () => {
    expect(tipoFunko('Pop!')).to.be.equal(TipoFunko.Pop);
    expect(tipoFunko('Pop! Rides')).to.be.equal(TipoFunko.PopRides);
    expect(tipoFunko('Vynil Soda')).to.be.equal(TipoFunko.VynilSoda);
    expect(tipoFunko('Vynil Gold')).to.be.equal(TipoFunko.VynilGold);
    expect(tipoFunko('Default')).to.be.equal(TipoFunko.Pop);
  });
  it("generoFunko : método que devuelve el genero de un funko", () => {
    expect(generoFunko('Animación')).to.be.equal(GeneroFunko.Animacion);
    expect(generoFunko('Películas y TV')).to.be.equal(GeneroFunko.PeliculasTV);
    expect(generoFunko('Videojuegos')).to.be.equal(GeneroFunko.Videojuegos);
    expect(generoFunko('Deportes')).to.be.equal(GeneroFunko.Deportes);
    expect(generoFunko('Música')).to.be.equal(GeneroFunko.Musica);
    expect(generoFunko('Ánime')).to.be.equal(GeneroFunko.Anime);
    expect(generoFunko('Default')).to.be.equal(GeneroFunko.Normal);
  });
});
