"use client";
import Link from "next/link";
import Image from "next/image";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blogs" }, // Changed from /blog to /blogs
  { name: "About", href: "/about" },
];

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-800 backdrop-blur-sm">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center text-white">
              <div className="w-8 h-8 rounded-full bg-gray-700">
                <Image
                  src="/images/logo.jpeg" // Temporarily using placeholder
                  alt="Logo"
                  width={32}
                  height={32}
                  className="rounded-full"
                  priority
                />
              </div>
              <span className="ml-2 text-lg font-bold">vdsidously</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="flex items-baseline ml-10 space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
