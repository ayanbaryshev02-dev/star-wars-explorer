import axios from 'axios';
import type { Film, Character, Planet, Starship } from '../types';

const BASE_URL = 'https://swapi.info/api';


const cache = new Map<string, unknown>();

const getCached = async <T>(key: string, fetcher: () => Promise<T>): Promise<T> => {
  if (cache.has(key)) {
    return cache.get(key) as T;
  }
  const data = await fetcher();
  cache.set(key, data);
  return data;
};


export const getFilm = (id: number): Promise<Film> =>
  getCached(`film:${id}`, async () => {
    const response = await axios.get<Film>(`${BASE_URL}/films/${id}`);
    return response.data;
  });

export const getFilms = (ids: number[]): Promise<Film[]> =>
  Promise.all(ids.map(id => getFilm(id)));


export const getCharacter = (id: number): Promise<Character> =>
  getCached(`character:${id}`, async () => {
    const response = await axios.get<Character>(`${BASE_URL}/people/${id}`);
    return response.data;
  });

export const getCharacters = (ids: number[]): Promise<Character[]> =>
  Promise.all(ids.map(id => getCharacter(id)));


export const getPlanet = (id: number): Promise<Planet> =>
  getCached(`planet:${id}`, async () => {
    const response = await axios.get<Planet>(`${BASE_URL}/planets/${id}`);
    return response.data;
  });

export const getPlanets = (ids: number[]): Promise<Planet[]> =>
  Promise.all(ids.map(id => getPlanet(id)));


export const getStarship = (id: number): Promise<Starship> =>
  getCached(`starship:${id}`, async () => {
    const response = await axios.get<Starship>(`${BASE_URL}/starships/${id}`);
    return response.data;
  });

export const getStarships = (ids: number[]): Promise<Starship[]> =>
  Promise.all(ids.map(id => getStarship(id)));