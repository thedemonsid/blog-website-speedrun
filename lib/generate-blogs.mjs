"use server";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

async function generateBlogsData() {
  const contentDir = path.join(process.cwd(), "app", "blogs", "content");
  try {
    const files = await fs.readdir(contentDir);
    const mdxFiles = files.filter((file) => path.extname(file) === ".mdx");

    const blogsData = await Promise.all(
      mdxFiles.map(async (file) => {
        const filePath = path.join(contentDir, file);
        const rawContent = await fs.readFile(filePath, "utf8");
        const { data, content } = matter(rawContent);
        const slug = path.basename(file, path.extname(file));

        return {
          slug,
          metadata: {
            title: data.title || "Untitled",
            publishedAt: data.publishedAt || "Unknown",
            summary: data.summary || "No summary available",
            category: data.category || "Uncategorized",
            author: data.author || "Anonymous",
          },
          content, //Todo: Include full content for now
        };
      })
    );

    const outputPath = path.join(process.cwd(), "blogs-data.json");
    await fs.writeFile(outputPath, JSON.stringify(blogsData, null, 2));
    console.log("Blogs data generated at:", outputPath);
  } catch (error) {
    console.error("Error generating blogs data:", error);
  }
}

generateBlogsData();
