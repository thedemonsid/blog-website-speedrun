"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Terminal, Code2, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-900 via-black to-zinc-900 text-white px-4 py-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto space-y-16"
      >
        {/* Header */}
        <header className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 text-sm"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 border border-zinc-800">
              <Terminal className="w-4 h-4 text-purple-400" />
              <span className="font-mono text-zinc-400">
                <span className="text-purple-400">~/</span>about-us
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent"
          >
            About Us
          </motion.h1>
        </header>

        {/* Story Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="prose prose-invert max-w-none"
        >
          <div className="text-lg text-zinc-300 leading-relaxed space-y-6">
            <p>
              We are childhood friends from a town in Maharashtra. It&apos;s
              been since almost childhood that we love to explore the subject in
              our hands. Life took turns and sways, and after finishing our
              secondary and higher secondary educations, we landed in the same
              subject for our degrees, CSE!
            </p>
            <p>
              Now we began to explore the subject and soon realized that
              there&apos;s seriously a major missing in people passionately
              expressing what they learn. This blog wasn&apos;t in plan even
              after that. But one day, I was watching a{" "}
              <a
                href="https://www.twitch.tv/theprimeagen"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 inline-flex items-center"
              >
                Prime <ArrowUpRight className="w-3 h-3 ml-0.5" />
              </a>{" "}
              video where he was reacting to some problems with HTML or
              something.
            </p>
          </div>
        </motion.section>

        {/* Mission Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-8"
        >
          <Card className="bg-zinc-900/30 border-zinc-800">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-2 text-2xl font-bold text-purple-300">
                <Code2 className="w-6 h-6" />
                What we Aim to bring
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-zinc-300">
                {[
                  "Fun nitty-gritty of stuff",
                  "Understandable language",
                  "Concise guides to interesting projects",
                  "Weekend project ideas",
                  "Tools to make your PC's look and feel better",
                  "Things to make your code cleaner",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card className="bg-zinc-900/30 border-zinc-800">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center gap-2 text-2xl font-bold text-purple-300">
                <Terminal className="w-6 h-6" />
                Recommendations
              </div>

              <div className="space-y-6 text-zinc-300">
                <div className="space-y-2">
                  <h3 className="font-semibold text-zinc-200">
                    Youtube channels
                  </h3>
                  <div className="flex gap-4 flex-wrap">
                    {[
                      ["Harkirat Singh", "https://www.youtube.com/@harkirat1"],
                      [
                        "Hitesh Chaudhary",
                        "https://www.youtube.com/@HiteshChoudharydotcom",
                      ],
                    ].map(([name, url], i) => (
                      <a
                        key={i}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300"
                      >
                        {name}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-zinc-200">Our Setup</h3>
                  <div className="grid gap-3 text-zinc-300">
                    <p>Editor: VS Code</p>
                    <p>Terminal: Warp Terminal (Vdcds)</p>
                    <p>API Testing: Postman (the_demon_sid)</p>
                    <p>
                      Theme: Catppuccin, Andromeda,{" "}
                      <a
                        href="https://chai-desktop.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 inline-flex items-center"
                      >
                        Chai theme <ExternalLink className="w-3 h-3 ml-0.5" />
                      </a>
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-zinc-200">Our Machines</h3>
                  <div className="space-y-2">
                    <a
                      href="https://www.asus.com/Laptops/For-Gaming/TUF-Gaming/ASUS-TUF-Gaming-F15-2022/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className=" text-purple-400 hover:text-purple-300 inline-flex items-center"
                    >
                      Asus TUF F15 (The Demon Sid){" "}
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                    <a
                      href="https://www.asus.com/Laptops/For-Home/Vivobook/Vivobook-K14-OLED-K3402Z/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className=" text-purple-400 hover:text-purple-300 inline-flex items-center"
                    >
                      Asus Vivobook K14 OLED (Vdcds){" "}
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </motion.div>
    </main>
  );
}
