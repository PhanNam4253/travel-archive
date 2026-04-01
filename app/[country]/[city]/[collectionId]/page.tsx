import { getPhotos } from "@/lib/data";
import Image from "next/image";

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ collectionId: string }>;
}) {
  const { collectionId } = await params;
  const photos = await getPhotos(Number(collectionId));
  return photos.map((p) => (
    <Image key={p.id} src={p.imageUrl} alt="p" height={300} width={300} />
  ));
}
