import { ImageResponse } from "next/og";
import { getBlogPost } from "../utils";

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
    // Resolve params and fetch blog post data
    const { slug } = await params;
    const post = await getBlogPost(slug);

    // Use fallback content if post or metadata is missing
    const title = post?.metadata?.title || fallbackTitle;
    const summary = post?.metadata?.summary || fallbackSummary;

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
