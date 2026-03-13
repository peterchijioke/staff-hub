import { getCountries } from '@/lib/api';
import AppContent from '@/components/AppContent';

export default async function Home() {
  // Use static countries list for instant load
  const countries = getCountries();

  return <AppContent countries={countries} />;
}
