import { fetchCities } from '@/lib/api';
import AppContent from '@/components/AppContent';

export default async function Home() {
  const rawData =await  fetchCities()

  return <AppContent rawRegionData={rawData}  />;
}
