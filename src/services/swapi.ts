import axios from 'axios';
import type { Film, Character, Planet, Starship } from '../types';

const BASE_URL = 'https://swapi.info/api';

export const extractId = (url: string): number => {
  const match = url.match(/\/(\d+)\/?$/);
  return match ? parseInt(match[1], 10) : 0;
};


export const getFilm = async (id: number): Promise<Film> => {
  const response = await axios.get<Film>(`${BASE_URL}/films/${id}`);
  return response.data;
};

export const getFilms = async (ids: number[]): Promise<Film[]> => {
  const promises = ids.map(id => getFilm(id));
  return Promise.all(promises);
};


export const getCharacter = async (id: number): Promise<Character> => {
  const response = await axios.get<Character>(`${BASE_URL}/people/${id}`);
  return response.data;
};


export const getPlanet = async (id: number): Promise<Planet> => {
  const response = await axios.get<Planet>(`${BASE_URL}/planets/${id}`);
  return response.data;
};


export const getStarship = async (id: number): Promise<Starship> => {
  const response = await axios.get<Starship>(`${BASE_URL}/starships/${id}`);
  return response.data;
};