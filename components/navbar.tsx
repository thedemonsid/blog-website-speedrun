"use client";

import Link from "next/link";
import { Search } from "lucide-react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blogs" },
  { name: "About", href: "/about" },
];

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-xl" />
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 relative">
        <div className="flex items-center h-16">
          <Link
            href="/"
            className="flex items-center text-[#8490ff] hover:text-[#99a3ff] transition-colors mr-8"
          >
            <span className="text-lg font-semibold tracking-tight">
              vdsidously
            </span>
          </Link>

          <div className="flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-[15px] text-zinc-300/90 hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-5 ml-auto">
            <button className="p-1.5 text-zinc-400/90 hover:text-white transition-colors rounded-md hover:bg-white/5">
              <Search size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
