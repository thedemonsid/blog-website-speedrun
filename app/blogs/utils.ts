"use server";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

// Get All the mdx files from the dir
async function getMDXfiles(dir: string) {
  const files = await fs.readdir(dir);
  return files.filter((file) => path.extname(file) === ".mdx");
}

// Read the content of the files
async function readMDXfile(filePath: string) {
  const rawContent = await fs.readFile(filePath, "utf8");
  return matter(rawContent);
}

enum MetaDataProps {
  title = "title",
  publishedAt = "publishedAt",
  summary = "summary",
  category = "category",
}

// present the mdx data and metadata
async function getMDXData(dir: string) {
  const mdxFiles = await getMDXfiles(dir);
  const mdxData = await Promise.all(
    mdxFiles.map(async (file) => {
      const { data, content } = await readMDXfile(path.join(dir, file));
      const metadata: { [key in MetaDataProps]: any } = {
        title: data.title,
        publishedAt: data.publishedAt,
        summary: data.summary,
        category: data.category,
      };
      const slug = path.basename(file, path.extname(file));
      return { metadata, content, slug };
    })
  );
  return mdxData;
}

export async function getBlogPosts() {
  const dir = path.join(process.cwd(), "app", "blogs", "content");
  return await getMDXData(dir);
}

export async function getBlogPost(slug: string) {
  const blogPosts = await getBlogPosts();
  return blogPosts.find((post) => post.slug === slug);
}