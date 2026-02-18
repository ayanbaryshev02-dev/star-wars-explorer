
export interface Film {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[]; 
  planets: string[]; 
  starships: string[]; 
  vehicles: string[]; 
  species: string[]; 
  created: string;
  edited: string;
  url: string;
}

export interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string; 
  films: string[]; 
  species: string[]; 
  vehicles: string[]; 
  starships: string[]; 
  created: string;
  edited: string;
  url: string;
}

export interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[]; 
  films: string[];
  created: string;
  edited: string;
  url: string;
}

export interface Starship {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: string[]; 
  films: string[];
  created: string;
  edited: string;
  url: string;
}


export interface CharacterData {
  id: number;
  name: string;
  height: string;
  mass: string;
  birth_year: string;
  description: string;
}

export interface PlanetData {
  id: number;
  name: string;
  rotation_period: string;
  diameter: string;
  climate: string;
  population: string;
  description: string;
}

export interface StarshipData {
  id: number;
  name: string;
  manufacturer: string;
  length: string;
  crew: string;
  max_atmosphering_speed: string;
  passengers: string;
  description: string;
}


export interface EnrichedCharacter extends Character {
  id: number;
  description: string;
  imageUrl: string; 
  cardImageUrl?: string; 
  hasCard: boolean; 
}

export interface EnrichedPlanet extends Planet {
  id: number;
  description: string;
  imageUrl: string;
}

export interface EnrichedStarship extends Starship {
  id: number;
  description: string;
  imageUrl: string;
}

export interface EnrichedFilm extends Film {
  id: number;
  imageUrl: string;
}




export type ExtractId = (url: string) => number;


export const CHARACTERS_WITH_CARDS = [
  11, // Anakin Skywalker
  2,  // C-3PO
  4,  // Darth Vader
  67, // Dooku
  79, // Grievous
  51, // Mace Windu
  44, // Darth Maul
  10, // Obi-Wan Kenobi
  35, // Padmé Amidala
  21, // Palpatine
  3,  // R2-D2
  20, // Yoda
];