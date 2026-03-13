import { City } from "@/types";

// Static list of countries for faster loading
const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Argentina", "Australia", "Austria", 
  "Bangladesh", "Belgium", "Brazil", "Canada", "Chile", "China", "Colombia", 
  "Czech Republic", "Denmark", "Egypt", "Finland", "France", "Germany", 
  "Greece", "Hong Kong", "Hungary", "India", "Indonesia", "Iran", "Iraq", 
  "Ireland", "Israel", "Italy", "Japan", "Kenya", "Malaysia", "Mexico", 
  "Morocco", "Netherlands", "New Zealand", "Nigeria", "Norway", "Pakistan", 
  "Peru", "Philippines", "Poland", "Portugal", "Romania", "Russia", 
  "Saudi Arabia", "Singapore", "South Africa", "South Korea", "Spain", 
  "Sweden", "Switzerland", "Taiwan", "Thailand", "Turkey", "Ukraine", 
  "United Arab Emirates", "United Kingdom", "United States", "Venezuela", 
  "Vietnam"
];

// Sample states/regions for major countries
const STATES_BY_COUNTRY: Record<string, string[]> = {
  "United States": ["California", "Texas", "New York", "Florida", "Illinois", "Pennsylvania", "Ohio", "Georgia", "North Carolina", "Michigan"],
  "United Kingdom": ["England", "Scotland", "Wales", "Northern Ireland"],
  "Australia": ["New South Wales", "Victoria", "Queensland", "Western Australia", "South Australia"],
  "Canada": ["Ontario", "Quebec", "British Columbia", "Alberta", "Manitoba"],
  "India": ["Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "Uttar Pradesh", "West Bengal"],
  "Germany": ["Bavaria", "North Rhine-Westphalia", "Baden-Württemberg", "Hesse", "Saxony"],
  "France": ["Île-de-France", "Auvergne-Rhône-Alpes", "Nouvelle-Aquitaine", "Occitanie", "Hauts-de-France"],
  "Brazil": ["São Paulo", "Rio de Janeiro", "Minas Gerais", "Bahia", "Rio Grande do Sul"],
  "Japan": ["Tokyo", "Osaka", "Kanagawa", "Aichi", "Hyogo"],
  "China": ["Beijing", "Shanghai", "Guangdong", "Jiangsu", "Zhejiang"],
  "Nigeria": ["Lagos", "Kano", "Ibadan", "Kaduna", "Port Harcourt"],
  "South Africa": ["Gauteng", "KwaZulu-Natal", "Western Cape", "Eastern Cape", "Limpopo"],
};


export function getCountries(): string[] {
  return COUNTRIES;
}
const API_URL = process.env.API_URL+'/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json';

export function getStates(country: string): string[] {
  return STATES_BY_COUNTRY[country] || ["Other"];
}


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
