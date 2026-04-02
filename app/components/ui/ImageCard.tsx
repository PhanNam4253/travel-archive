"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ImageCardProps {
  id: number;
  name: string;
  description?: string;
  coverImage?: string;
  slug: string;
}

export function ImageCard({
  id,
  name,
  description,
  coverImage,
  slug,
}: ImageCardProps) {
  const pathName = usePathname();
  return (
    <Link
      href={slug ? `${pathName}/${slug}` : `${pathName}/${id}`}
      className="group block"
    >
      <div className="relative w-full h-60 overflow-hidden rounded-lg mb-4">
        <Image
          src={coverImage || ""}
          alt={name}
          fill
          unoptimized
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
        {!description && (
          <h3 className="absolute bottom-4 left-4 text-xl text-white">
            {name}
          </h3>
        )}
      </div>
      {description && (
        <>
          <h3 className="text-lg mb-2">{name}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </>
      )}
    </Link>
  );
}
