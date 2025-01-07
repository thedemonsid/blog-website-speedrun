// app/blogs/[blogId]/blog-post.tsx
"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { motion } from "framer-motion";
import Markdown from "react-markdown";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";
import ProgressBar from "./progress-bar";

interface BlogPostProps {
  blog: {
    id: string;
    title: string;
    content: string;
    category?: string;
    createdAt?: Date;
  };
}

export default function BlogPost({ blog }: BlogPostProps) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background/90 to-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          {/* Back Button */}
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-purple-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to articles
          </Link>

          {/* Header */}
          <header className="space-y-8 pb-8 border-b border-zinc-800">
            <div className="space-y-2">
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent"
              >
                {blog.title}
              </motion.h1>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm">
              {blog.category && (
                <div className="flex items-center gap-2 text-purple-300">
                  <Tag className="w-4 h-4" />
                  <span>{blog.category}</span>
                </div>
              )}

              {blog.createdAt && (
                <div className="flex items-center gap-2 text-zinc-400">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={new Date(blog.createdAt).toISOString()}>
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                </div>
              )}
            </div>
          </header>

          {/* Content */}
          <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="prose prose-invert max-w-none prose-pre:p-0"
          >
            <Markdown
              remarkPlugins={[remarkGfm]}
              components={{
                // Style code blocks
                code({ inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <div className="relative group">
                      <SyntaxHighlighter
                        style={oneDark}
                        language={match[1]}
                        PreTag="div"
                        className="rounded-lg !bg-zinc-900/50 !p-4 border border-zinc-800"
                        {...props}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    </div>
                  ) : (
                    <code
                      className="bg-zinc-800 px-1.5 py-0.5 rounded text-purple-300"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
                // Style headings
                h2: ({ children }) => (
                  <h2 className="text-2xl font-bold mt-8 mb-4 text-zinc-100">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-bold mt-6 mb-3 text-zinc-200">
                    {children}
                  </h3>
                ),
                // Style links
                a: ({ children, href }) => (
                  <a
                    href={href}
                    className="text-purple-300 hover:text-purple-400 transition-colors"
                  >
                    {children}
                  </a>
                ),
                // Style blockquotes
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-purple-500/50 pl-4 italic text-zinc-400">
                    {children}
                  </blockquote>
                ),
                // Style lists
                ul: ({ children }) => (
                  <ul className="list-disc list-inside space-y-2 text-zinc-300">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside space-y-2 text-zinc-300">
                    {children}
                  </ol>
                ),
              }}
            >
              {blog.content}
            </Markdown>
          </motion.article>
        </motion.div>
      </div>
    </main>
  );
}
