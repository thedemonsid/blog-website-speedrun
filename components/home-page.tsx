"use client";
import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Terminal, Timer, ArrowRight, Code2 } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Cloud } from "@/components/cloud";

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
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  return (
    <>
      <Cloud position="top" className="z-10" />
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-muted via-primary to-secondary origin-[0%] z-50"
        style={{ scaleX }}
      />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative min-h-screen bg-gradient-to-b from-background via-background/90 to-background"
      >
        <div className="max-w-4xl mx-auto px-4 py-24">
          <header className="space-y-12 mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 text-sm"
            >
              <Badge
                variant="secondary"
                className="flex items-center gap-2 px-4"
              >
                <Terminal className="w-4 h-4 text-primary" />
                <span className="font-mono text-muted-foreground">
                  <span className="text-primary">~/</span>
                  thoughts-and-knowledge
                </span>
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              <span className="block text-4xl sm:text-6xl font-bold tracking-wider bg-gradient-to-r from-foreground via-foreground/80 to-muted-foreground bg-clip-text text-transparent font-wotfard">
                Thoughts, Stories, and
                <br /> Technical Guides
              </span>
              <div className="flex items-center gap-4 text-lg sm:text-xl text-muted-foreground font-mono">
                <Code2 className="w-5 h-5 text-primary" />
                <span className="text-primary font-wotfard">
                  Documenting the journey.
                </span>
              </div>
            </motion.h1>
          </header>

          <section className="space-y-8">
            <div className="grid gap-8">
              {initialBlogs.map((blog, i) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={`/blogs/${blog.id}`} className="group">
                    <article className="relative p-6 rounded-lg border border-border bg-card/30 backdrop-blur-sm hover:bg-card/50 hover:border-primary/50 transition-all">
                      <div className="flex items-center gap-4">
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-2"
                        >
                          {blog.category?.includes("code") ? (
                            <Code2 className="w-4 h-4" />
                          ) : (
                            <Terminal className="w-4 h-4" />
                          )}
                          {blog.category || "0x01"}
                        </Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Timer className="w-4 h-4 mr-1" />
                          <span>{blog.readTime || "5"} min read</span>
                        </div>
                      </div>

                      <div className="mt-4 space-y-2">
                        <h2 className="text-xl font-semibold text-foreground">
                          {blog.title}
                        </h2>
                        <p className="text-muted-foreground">
                          {blog.description}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-primary transition-colors">
                          Read article
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </div>
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
