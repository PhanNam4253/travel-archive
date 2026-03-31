import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, slug, coverImage } = body;

    if (!name || !slug) {
      return NextResponse.json(
        { error: "Missing name or slug" },
        { status: 400 }
      );
    }

    const country = await prisma.country.create({
      data: {
        name,
        slug,
        coverImage: coverImage || null,
      },
    });

    return NextResponse.json(country);
  } catch (error) {
    return NextResponse.json(
      { error: error || "Failed to create country" },
      { status: 500 }
    );
  }
}