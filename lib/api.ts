import { City } from '@/types';

const API_URL = 'https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json';

export async function fetchCities(): Promise<City[]> {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch cities');
    }
    const data: City[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching cities:', error);
    return [];
  }
}

export function getUniqueCountries(cities: City[]): string[] {
  const countries = new Set(cities.map((city) => city.country));
  return Array.from(countries).sort();
}

export function getStatesByCountry(cities: City[], country: string): string[] {
  const states = new Set(
    cities
      .filter((city) => city.country === city.country && city.subcountry)
      .map((city) => city.subcountry as string)
  );
  return Array.from(states).sort();
}

export function getCitiesByCountryAndState(cities: City[], country: string, state: string): string[] {
  return cities
    .filter((city) => city.country === country && city.subcountry === state)
    .map((city) => city.name)
    .sort();
}
