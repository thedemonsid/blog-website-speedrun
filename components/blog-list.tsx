"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Blog {
  slug: string;
  metadata: {
    title: string;
    publishedAt: string;
    summary: string;
    category: string;
  };
  content: string;
}

interface BlogsListProps {
  blogs: Blog[];
}

export default function BlogsList({ blogs }: BlogsListProps) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background/90 to-background text-foreground px-4 py-20">
      <div className="max-w-5xl mx-auto">
        <header className="mb-20 space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-foreground via-foreground/80 to-muted-foreground bg-clip-text text-transparent">
              Articles and Tutorials
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              {blogs.length} hand-crafted articles about JavaScript, React, and
              modern web development
            </p>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {blogs.map((blog) => (
            <Card
              key={blog.slug}
              className="group relative bg-background border-border/50 hover:border-border backdrop-blur-sm transition-all duration-500"
            >
              <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-4 flex-wrap">
                  {blog.metadata.category && (
                    <Badge
                      variant="secondary"
                      className="bg-purple-500/10 text-purple-300 border border-purple-500/20 font-mono"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {blog.metadata.category}
                    </Badge>
                  )}

                  <div className="flex items-center text-sm text-zinc-500">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>
                      {blog.metadata.publishedAt &&
                        new Date(
                          blog.metadata.publishedAt
                        ).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/blogs/${blog.slug}`}
                  className="block space-y-3 group/link"
                >
                  <h2 className="text-2xl font-bold text-primary group-hover:text-muted-foreground transition-colors duration-300">
                    {blog.metadata.title}
                  </h2>

                  <p className="text-zinc-400 leading-relaxed">
                    {blog.metadata.summary}
                  </p>

                  <div className="inline-flex items-center gap-2 text-[15px] text-zinc-500 group-hover/link:text-purple-300 transition-colors duration-300">
                    Read article
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </div>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
