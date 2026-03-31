import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, slug, description, coverImage, cityId } = body;

    if (!name || !slug || !cityId) {
      return NextResponse.json(
        { error: "Missing name, slug, or cityId" },
        { status: 400 }
      );
    }

    const collection = await prisma.collection.create({
      data: {
        name,
        slug,
        description: description || null,
        coverImage: coverImage || null,
        cityId,
      },
    });

    return NextResponse.json(collection);
  } catch (error) {
    console.error("Error creating collection:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create collection" },
      { status: 500 }
    );
  }
}
