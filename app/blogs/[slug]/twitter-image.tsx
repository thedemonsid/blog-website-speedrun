import { ImageResponse } from "next/og";
import { readFile, readdir } from "node:fs/promises";
import { join, extname, basename } from "node:path";
import matter from "gray-matter";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generate image based on blog post slug
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Default fallback content
  const fallbackTitle = "Blog Post";
  const fallbackSummary = "Check out our latest blog post!";

  try {
    // Resolve params and extract slug
    const { slug } = await params;

    // Define the directory containing the blog posts
    const contentDir = join(process.cwd(), "app", "blogs", "content");

    // Get all .mdx files in the directory
    const files = await readdir(contentDir);
    const mdxFiles = files.filter((file) => extname(file) === ".mdx");

    // Find the file matching the slug
    const fileName = mdxFiles.find((file) => basename(file, ".mdx") === slug);

    let title = fallbackTitle;
    let summary = fallbackSummary;

    if (fileName) {
      // Read and parse the file
      const filePath = join(contentDir, fileName);
      const rawContent = await readFile(filePath, "utf8");
      const { data } = matter(rawContent);

      // Extract metadata
      title = data.title || fallbackTitle;
      summary = data.summary || fallbackSummary;
    }

    // Generate the OpenGraph image
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 48,
            background: "white",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
          }}
        >
          <h1 style={{ margin: "0 0 40px 0" }}>{title}</h1>
          <p style={{ fontSize: 28, opacity: 0.8 }}>{summary}</p>
        </div>
      ),
      { ...size }
    );
  } catch (error) {
    console.error("Error generating OpenGraph image:", error);

    // Return fallback content in case of an error
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 48,
            background: "white",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
          }}
        >
          <h1 style={{ margin: "0 0 40px 0" }}>{fallbackTitle}</h1>
          <p style={{ fontSize: 28, opacity: 0.8 }}>{fallbackSummary}</p>
        </div>
      ),
      { ...size }
    );
  }
}
