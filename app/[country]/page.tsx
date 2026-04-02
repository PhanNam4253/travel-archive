import { getCities } from "@/lib/data";
import { ImageCard } from "../components/ui/ImageCard";

export default async function CountryPage({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const { country: slug } = await params;
  const cities = await getCities(slug);

  return (
    <div className="min-h-screen">
      <div className="mx-auto px-4 md:px-20 py-16">
        <div className="mb-16 text-center">
          <h1 className="text-4xl mb-4">My Travel Archive</h1>
          <p className="text-lg text-muted-foreground">
            A collection of places I&apos;ve been
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city) => (
            <ImageCard
              key={`country - ${city.id}`}
              id={city.id}
              slug={city.slug}
              name={city.name}
              coverImage={city.coverImage ?? undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
