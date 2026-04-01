import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const collectionId = searchParams.get("collectionId");

    const photos = await prisma.photo.findMany({
      where: collectionId ? { collectionId: parseInt(collectionId) } : undefined,
      include: {
        collection: {
          include: {
            city: {
              include: {
                country: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(photos);
  } catch (error) {
    console.error("Error fetching photos:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch photos" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const isArray = Array.isArray(body);
    const photosData = isArray ? body : [body];

    // Validate all photos
    for (const photo of photosData) {
      if (!photo.imageUrl || !photo.publicId || !photo.category || !photo.collectionId) {
        return NextResponse.json(
          {
            error:
              "Missing required fields: imageUrl, publicId, category, collectionId",
          },
          { status: 400 }
        );
      }
    }

    // Create photos
    const createdPhotos = await prisma.photo.createMany({
      data: photosData.map((photo) => ({
        imageUrl: photo.imageUrl,
        publicId: photo.publicId,
        category: photo.category,
        caption: photo.caption || null,
        collectionId: photo.collectionId,
      })),
    });

    // Fetch and return created photos
    const photos = await prisma.photo.findMany({
      where: {
        collectionId: photosData[0].collectionId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: createdPhotos.count,
    });

    return NextResponse.json(isArray ? photos : photos[0]);
  } catch (error) {
    console.error("Error creating photo:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to create photo",
      },
      { status: 500 }
    );
  }
}
