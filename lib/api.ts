import { City } from "@/types";

const API_URL = process.env.API_URL+'/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json';



export async function fetchCities(): Promise<any[]> {
  try {
    const response = await fetch(API_URL, { 
      next: { revalidate: 3600 } 
    });
    if (!response.ok) {
      throw new Error('Failed to fetch cities');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching cities:', error);
    return [];
  }
}



export const fetchCountries =(data:City[])=>[...new Set(data.map(i => i.country))].sort();

export const generateStateByCountry =(data:City[])=> data.reduce<Record<string, string[]>>((acc, item) => {
  if (!acc[item.country]) acc[item.country] = [];
  if (!acc[item.country].includes(item.subcountry)) {
    acc[item.country].push(item.subcountry);
  }
  return acc;
}, {});
export function getStatesV2(data:City[],country: string): string[] {
  return generateStateByCountry(data)[country] || ["Other"];
}