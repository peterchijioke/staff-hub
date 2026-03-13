import { fetchCities, getCountries } from '@/lib/api';
import AppContent from '@/components/AppContent';

export default async function Home() {
  const rawData =await  fetchCities()
  const countries = getCountries();

  return <AppContent rawRegionData={rawData} countries={countries as any} />;
}
