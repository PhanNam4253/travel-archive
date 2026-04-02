import { getPhotos } from "@/lib/data";
import Image from "next/image";

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection } = await params;
  console.log(collection);
  const photos = await getPhotos(collection);
  return photos.map((p) => (
    <Image key={p.id} src={p.imageUrl} alt="p" height={300} width={300} />
  ));
}
