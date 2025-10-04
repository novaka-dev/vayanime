"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GENRES, TYPES } from "@/lib/constants";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/popular",
    label: "Popular",
  },
];

export default function Navbar() {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  return (
    <header className="w-full fixed top-0 z-50 py-3 bg-background/60 backdrop-blur border-b">
      <nav className="flex items-center justify-between mx-20 px-6 md:px-8 lg:px-10">
        {/* Logo dan navigasi */}
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Logo"
              width={100}
              height={100}
              className="w-12 h-12"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Vayanime
            </span>
          </Link>

          {/* Navigasi utama */}
          <ul className="flex items-center gap-6 text-base font-medium text-muted-foreground">
            {navLinks.map(({ href, label }) => (
              <div
                key={href}
                className="duration-200 font-medium ease-linear hover:text-primary"
              >
                <Link href={href}>{label}</Link>
              </div>
            ))}

            {/* Dropdown category */}
            <li>
              <DropdownMenu onOpenChange={setIsCategoryOpen}>
                <DropdownMenuTrigger className="flex items-center gap-1 duration-300 font-medium ease-linear hover:text-primary">
                  Category
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${isCategoryOpen ? "rotate-180" : ""}`}
                  />
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="start"
                  className="p-6 w-[800px] bg-background border shadow-xl grid grid-cols-[1fr_auto_4fr] gap-6"
                >
                  {/* Kategori link */}
                  <div className="flex flex-col gap-3 text-sm">
                    {TYPES.map((type, idx) => (
                      <Link
                        href={type.href}
                        key={idx}
                        className={`relative w-fit text-muted-foreground transition-colors duration-300 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-purple-500 after:transition-all after:duration-300 hover:text-primary hover:after:w-full`}
                      >
                        {type.title}
                      </Link>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="w-px bg-border" />

                  {/* Genre list */}
                  <div>
                    <p className="text-sm font-semibold mb-2">GENRE</p>
                    <div className="grid grid-cols-4 gap-2">
                      {GENRES.map((genre, idx) => (
                        <Link
                          className="text-muted-foreground hover:text-purple-500 transition-colors duration-200 ease-linear"
                          href={`/genre/${genre}`}
                          key={idx}
                        >
                          {genre}
                        </Link>
                      ))}
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          </ul>

          {/* Search bar */}
          <form></form>
        </div>

        {/* Tombol login */}
        <div>
          <Button variant={"default"}>Login</Button>
        </div>
      </nav>
    </header>
  );
}
