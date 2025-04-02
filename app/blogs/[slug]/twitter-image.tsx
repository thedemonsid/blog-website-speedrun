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
  // Fetch your blog post data
  const { slug } = await params;
  const post = await getBlogPost(slug);

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
        <h1 style={{ margin: "0 0 40px 0" }}>{post?.metadata.title}</h1>
        <p style={{ fontSize: 28, opacity: 0.8 }}>{post?.metadata.summary}</p>
      </div>
    ),
    { ...size }
  );
}
