import { ImageCard } from "@/app/components/ui/ImageCard";
import { getCollections } from "@/lib/data";
import Image from "next/image";

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const collections = await getCollections(city);
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
          {collections.map((collection) => (
            <ImageCard
              key={`city - ${collection.id}`}
              id={collection.id}
              slug={collection.slug}
              name={collection.name}
              coverImage={collection.coverImage ?? undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
