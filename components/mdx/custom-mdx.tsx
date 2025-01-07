import { MDXRemote } from "next-mdx-remote/rsc";
import Image, { ImageProps } from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";
import { highlight } from "sugar-high";
import MyComponent from "./my-component";
import { cn } from "@/lib/utils";
// Interfaces
interface HeadingProps {
  children: string;
}

interface CustomLinkProps {
  href: string;
  children: ReactNode;
}

interface CodeProps {
  children: string;
}

interface BlockQuoteProps {
  children: ReactNode;
}

interface TableData {
  headers: string[];
  rows: ReactNode[][];
}

interface TableProps {
  data: TableData;
}

interface MDXProps {
  source: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  components?: Record<string, React.ComponentType<any>>;
}

// Functions
function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/\-\-+/g, "-");
}

function createHeading(level: number) {
  const Heading = ({ children }: HeadingProps) => {
    const slug = slugify(children);

    const headingClasses: Record<number, string> = {
      1: "text-4xl font-bold mt-8 mb-4",
      2: "text-3xl font-semibold mt-6 mb-3",
      3: "text-2xl font-medium mt-4 mb-2",
      4: "text-xl font-medium mt-3 mb-1",
      5: "text-lg font-medium mt-2 mb-1",
      6: "text-base font-medium mt-1 mb-1",
    };

    return React.createElement(
      `h${level}`,
      { id: slug, className: headingClasses[level] },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: cn(`heading-${level}`, "anchor"),
        }),
      ],
      children
    );
  };
  Heading.displayName = `Heading${level}`;
  return Heading;
}

function RoundedImage({ alt, ...props }: ImageProps) {
  return <Image alt={alt} className="rounded-lg" {...props} />;
}

function CustomLink({ href, children, ...props }: CustomLinkProps) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }
  if (href.startsWith("#")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

function Code({ children, ...props }: CodeProps) {
  const codeHTML = highlight(children);
  return <code {...props} dangerouslySetInnerHTML={{ __html: codeHTML }} />;
}

function BlockQuote({ children, ...props }: BlockQuoteProps) {
  return (
    <blockquote {...props} className="border-l-4 border-gray-300 pl-4">
      {children}
    </blockquote>
  );
}

function Table({ data }: TableProps) {
  return (
    <table>
      <thead>
        <tr>
          {data.headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  blockquote: BlockQuote,
  Table,
  MyComponent,
};

export function CustomMDX(props: MDXProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
