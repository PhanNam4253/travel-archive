import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const countryId = searchParams.get("countryId");

    const cities = await prisma.city.findMany({
      where: countryId ? { countryId: parseInt(countryId) } : undefined,
      include: {
        country: true,
        collections: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(cities);
  } catch (error) {
    console.error("Error fetching cities:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to fetch cities",
      },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, slug, countryId, coverImage } = body;

    if (!name || !slug || !countryId) {
      return NextResponse.json(
        { error: "Missing name, slug, or countryId" },
        { status: 400 },
      );
    }

    const city = await prisma.city.create({
      data: {
        name,
        slug,
        countryId,
        coverImage,
      },
    });

    return NextResponse.json(city);
  } catch (error) {
    console.error("Error creating city:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to create city",
      },
      { status: 500 },
    );
  }
}
