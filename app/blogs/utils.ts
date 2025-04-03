import blogsData from "../../blogs-data.json";

export async function getBlogPosts() {
  // Return all blog posts
  return blogsData;
}

export async function getBlogPost(slug: string) {
  // Find a specific blog post by slug
  return blogsData.find((post) => post.slug === slug) || null;
}
export type BlogProps = {
  metadata: {
    title: string;

    publishedAt: string;
    summary: string;
    category: string;
    author: string;
  };
  content: string;
  slug: string;
};