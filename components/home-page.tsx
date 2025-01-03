"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Terminal, Timer, ArrowRight, Code2 } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface Blog {
  id: string;
  title: string;
  description: string;
  category?: string;
  readTime?: number;
}

interface HomePageProps {
  initialBlogs: Blog[];
}

export default function HomePage({ initialBlogs }: HomePageProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 origin-[0%] z-50"
        style={{ scaleX }}
      />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative min-h-screen bg-gradient-to-b from-zinc-950 via-black to-zinc-950 text-white px-4 py-20"
      >
        <div className="max-w-4xl mx-auto space-y-20">
          <header className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 text-sm"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 border border-zinc-800">
                <Terminal className="w-4 h-4 text-pink-400" />
                <span className="font-mono text-zinc-400">
                  <span className="text-pink-400">~/</span>
                  thoughts-and-knowledge
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              <span className="block text-4xl sm:text-6xl font-bold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                Thoughts, Stories, and
                <br /> Technical Guides
              </span>
              <div className="flex items-center gap-4 text-lg sm:text-xl text-zinc-400 font-mono">
                <Code2 className="w-5 h-5 text-lime-300" />
                <span className="text-lime-300">Documenting the journey.</span>
              </div>
            </motion.h1>
          </header>

          <section>
            <div className="grid gap-8">
              {initialBlogs.map((blog, i) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative"
                >
                  <Link href={`/blogs/${blog.id}`}>
                    <article className="relative space-y-4 p-6 rounded-xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/50">
                      <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div className="flex items-center gap-4">
                        <Badge
                          variant="secondary"
                          className="bg-zinc-900 text-green-400 font-mono border border-pink-500/20"
                        >
                          {blog.category || "0x01"}
                        </Badge>
                        <div className="flex items-center text-sm text-zinc-500 font-mono">
                          <Timer className="w-4 h-4 mr-1" />
                          <span>{blog.readTime || 5} min read</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h2 className="text-2xl font-semibold group-hover:text-pink-400 transition-colors">
                          {blog.title}
                        </h2>
                        <p className="text-zinc-400 leading-relaxed">
                          {blog.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-zinc-500 group-hover:text-pink-400 transition-colors">
                        Read article
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </article>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </motion.main>
    </>
  );
}
