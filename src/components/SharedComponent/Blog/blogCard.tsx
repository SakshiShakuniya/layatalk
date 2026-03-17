import React from "react";
import Image from "next/image";
import { Blog } from "@/types/blog";
import { format } from "date-fns";
import Link from "next/link";

const BlogCard = ({ blog }: { blog: Blog }) => {
  const { title, coverImage, date, slug } = blog;
  const hasImage = typeof coverImage === "string" && coverImage.trim() !== "";
  if (!slug) return null;

  return (
    <Link href={`/blog/${slug}`} className="group flex flex-col h-full w-full cursor-pointer">
      {hasImage && (
        <div className="relative w-full aspect-video overflow-hidden rounded-xl mb-4">
          <Image
            src={coverImage}
            alt={title || "image"}
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            className="object-cover group-hover:scale-105 duration-300 transition-transform"
          />
        </div>
      )}
      <span className="text-14 text-muted/60 mb-2 block">
        {format(new Date(date), "MMM dd yyyy")}
      </span>
      <h5 className="text-20 text-white font-medium mb-4 group-hover:text-primary line-clamp-2">
        {title}
      </h5>
      <div className="mt-auto">
        <p className="text-primary text-16 font-medium">Read More</p>
      </div>
    </Link>
  );
};

export default BlogCard;
