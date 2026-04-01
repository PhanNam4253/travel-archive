import { getCollections } from "@/lib/data";
import Image from "next/image";

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  console.log(city);
  const collections = await getCollections(city);
  return collections.map((collection) => (
    <div key={`collection - ${collection.id}`}>
      {collection.name}
      <Image
        src={collection.coverImage || ""}
        alt="photo"
        width={300}
        height={400}
      />
    </div>
  ));
}
