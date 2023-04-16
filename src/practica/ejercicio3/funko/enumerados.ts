/**
 * Enumerado que permite representar los tipos de Funko
 */
export enum TipoFunko {
  'Pop' = 'Pop!',
  'PopRides' = 'Pop! Rides',
  'VynilSoda' = 'Vynil Soda',
  'VynilGold' = 'Vynil Gold'
}


/**
 * Función que permite convertir un string en un tipo de funko
 * @param tipo cadena de texto que representa el tipo de funko
 * @returns elemento del enumerado TipoFunko
 */
export function tipoFunko(tipo: string): TipoFunko {
  switch (tipo) {
    case 'Pop!':
      return TipoFunko.Pop;
    case 'Pop! Rides':
      return TipoFunko.PopRides;
    case 'Vynil Soda':
      return TipoFunko.VynilSoda;
    case 'Vynil Gold':
      return TipoFunko.VynilGold;
    default:
      return TipoFunko.Pop;
  }
}



/**
 * Enumerado que permite representar los géneros de Funko
 */
export enum GeneroFunko {
  'Normal' = 'Normal',
  'Animacion' = 'Animación',
  'PeliculasTV' = 'Películas y TV',
  'Videojuegos' = 'Videojuegos',
  'Deportes' = 'Deportes',
  'Musica' = 'Música',
  'Anime' = 'Ánime'
}


/**
 * Función que permite convertir un string en un género de funko
 * @param genero cadena de texto que representa el género de funko
 * @returns elemento del enumerado GeneroFunko
 */
export function generoFunko(genero: string): GeneroFunko {
  switch (genero) {
    case 'Animación':
      return GeneroFunko.Animacion;
    case 'Películas y TV':
      return GeneroFunko.PeliculasTV;
    case 'Videojuegos':
      return GeneroFunko.Videojuegos;
    case 'Deportes':
      return GeneroFunko.Deportes;
    case 'Música':
      return GeneroFunko.Musica;
    case 'Ánime':
      return GeneroFunko.Anime;
    default:
      return GeneroFunko.Normal;
  }
}