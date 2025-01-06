import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { highlight } from "sugar-high";
import MyComponent from "./my-component";
import { cn } from "@/lib/utils";
function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}
function createHeading(level: number) {
  const Heading = ({ children }: any) => {
    let slug = slugify(children);

    const headingClasses: { [key: number]: string } = {
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
function RoundedImage(props: any) {
  return <Image alt={props.alt} className="rounded-lg" {...props} />;
}
function CustomLink(props: any) {
  let href = props.href;
  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }
  if (href.startsWith("#")) {
    return <a {...props}>{props.children}</a>;
  }
  return <a target="_blank" rel="noopener noreferrer" {...props}></a>;
}
function Code({ children, ...props }: any) {
  let codeHTML = highlight(children);
  return <code {...props} dangerouslySetInnerHTML={{ __html: codeHTML }} />;
}
function BlockQuote(props: any) {
  return (
    <blockquote
      {...props}
      className="border-l-4 border-gray-300 pl-4"
    ></blockquote>
  );
}
function Table({ data }: any) {
  let headers = data.headers.map((header: any, index: any) => (
    <th key={index}>{header}</th>
  ));
  let rows = data.rows.map((cell: any, cellIndex: any) => {
    return <tr key={cellIndex}>{cell}</tr>;
  });
  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
let components = {
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
export function CustomMDX(props: any) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    ></MDXRemote>
  );
}
