/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Create some users
  const user1 = await prisma.users.create({
    data: {
      name: "John Doe",
      email: "john.doe@example.com",
      blogs: {
        create: [
          {
            title: "First Blog Post",
            description: "This is the first blog post",
            author: "John Doe",
            content: `
# First Blog Post

This is the **first** blog post.

- Item 1
- Item 2
- Item 3

\`\`\`javascript
console.log('Hello, world!');
\`\`\`
          `,
          },
          {
            title: "Second Blog Post",
            description: "This is the second blog post",
            author: "John Doe",
            content: `
# Second Blog Post

This is the **second** blog post.

- Item A
- Item B
- Item C

\`\`\`javascript
console.log('Hello again, world!');
\`\`\`
          `,
          },
        ],
      },
    },
  });

  const user2 = await prisma.users.create({
    data: {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      blogs: {
        create: [
          {
            title: "Jane's Blog Post",
            description: "This is Jane's blog post",
            author: "Jane Smith",
            content: `
# Jane's Blog Post

This is **Jane's** blog post.

- Point 1
- Point 2
- Point 3

\`\`\`javascript
console.log('Hello from Jane!');
\`\`\`
          `,
          },
        ],
      },
    },
  });

  console.log({ user1, user2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
