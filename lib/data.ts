import prisma from "./prisma";

export async function getCountries() {
  return prisma.country.findMany({ orderBy: { name: "asc" } });
}

export async function getCities(countrySlug: string) {
  const country = await prisma.country.findUnique({
    where: {
      slug: countrySlug,
    },
  });
  if (!country) return [];
  return prisma.city.findMany({
    where: { countryId: country.id },
    orderBy: {
      name: "asc",
    },
  });
}

export async function getCollections(citySlug: string) {
  const city = await prisma.city.findFirst({
    where: {
      slug: citySlug,
    },
  });
  if (!city) return [];
  return prisma.collection.findMany({
    where: { cityId: city.id },
    orderBy: {
      name: "asc",
    },
  });
}

export async function getPhotos(collectionSlug: string) {
  const collection = await prisma.collection.findFirst({
    where: {
      slug: collectionSlug,
    },
  });
  if (!collection) return [];
  return prisma.photo.findMany({
    where: {
      collectionId: collection.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
