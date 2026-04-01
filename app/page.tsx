import { getCountries } from "@/lib/data";

export default async function Home() {
  const countries = await getCountries();
  return countries.map((country) => (
    <div key={`country - ${country.id}`}>
      {country.name} - {country.slug}
    </div>
  ));
}
