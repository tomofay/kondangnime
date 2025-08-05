"use client";
import { Button } from '@heroui/react';
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="flex justify-between items-center py-4 px-6 bg-dark-surface-2 shadow-md">
      <Link href="/" className="text-anime-primary font-bold text-xl">
        KONDANG<span className="text-anime-secondary">NIME</span>
      </Link>
      <div className="flex gap-2 items-center">
        <Button as={Link} href="/" className="bg-transparent hover:bg-anime-primary/10 text-white">Home</Button>
        <Button as={Link} href="/browse" className="bg-transparent hover:bg-anime-primary/10 text-white">Browse</Button>
        <Button as={Link} href="/search" className="bg-transparent hover:bg-anime-primary/10 text-white">Search</Button>

        <Button
          isIconOnly
          variant="ghost"
          className="ml-2"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <SunIcon className="h-5 w-5 text-yellow-300" />
          ) : (
            <MoonIcon className="h-5 w-5 text-anime-primary" />
          )}
        </Button>
      </div>
    </nav>
  );
}
