import React from "react";
import { getBlogPost } from "../utils";
import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx/custom-mdx";
import { formatDate } from "@/lib/format-date";

const Blog = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const blog = await getBlogPost(slug);
  if (!blog) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto p-6 font-wotfard">
      <h1 className="text-4xl font-bold mb-4">{blog.metadata.title}</h1>
      <p className="text-gray-500 mb-2">
        {formatDate(blog.metadata.publishedAt)}
      </p>
      <p className="text-gray-700 mb-6">{blog.metadata.summary}</p>
      <article className="prose">
        <CustomMDX source={blog.content} />
      </article>
    </div>
  );
};

export default Blog;
