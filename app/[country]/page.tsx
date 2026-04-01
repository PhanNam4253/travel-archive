import { getCities } from "@/lib/data";

export default async function CountryPage({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const { country: slug } = await params;
  const cities = await getCities(slug);

  return cities.map((city) => (
    <div key={`city -${city.id}`}>
      {city.name} - {city.slug}
    </div>
  ));
}
