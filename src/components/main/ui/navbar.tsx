"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GENRES, TYPES } from "@/lib/constants";
import { ChevronDown, Ghost, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useQueryState } from "nuqs";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SearchValidateSchema } from "@/lib/validations";
import { useSiteStore } from "@/store/site";
import { SearchBar } from "@/components/ui/search-bar";

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

  const { isSearchBarOpen, setIsSearchBarOpen } = useSiteStore();

  const [query] = useQueryState("keyword", {
    defaultValue: "",
    clearOnDefault: true,
  });

  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setFocus,
  } = useForm<z.infer<typeof SearchValidateSchema>>({
    resolver: zodResolver(SearchValidateSchema),
    defaultValues: {
      query: query ?? "",
    },
  });

  const onSubmit = handleSubmit(({ query }) => {
    router.push(`/search?keyword=${query}`);
    setIsSearchBarOpen(false);
  });

  useEffect(() => {
    if (isSearchBarOpen) {
      setFocus("query");
    }
  }, [isSearchBarOpen, setFocus]);

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
          <form
            className="relative hidden xl:flex max-w-sm shrink-0 items-center gap-3"
            onSubmit={onSubmit}
          >
            <SearchBar
              placeholder="Search..."
              type="search"
              data-error={!!errors.query as boolean}
              className="h-10 w-full rounded-sm pr-12 data-[error=true]:bg-red-100 data-[error=true]:text-red-500 data-[error=true]:outline-red-500"
              {...register("query")}
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2">
              <Search className="w-5 h-5 text-black/80" />
            </button>
          </form>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant={"ghost"}
            onClick={() => setIsSearchBarOpen(!isSearchBarOpen)}
            className="xl:hidden"
            size={"icon"}
          >
            <Search
              data-open={isSearchBarOpen}
              className="!w-5 !h-5 text-white data-[open=true]:text-muted-foreground"
            />
          </Button>
        </div>

        {/* Tombol login */}
        <div>
          <Button variant={"default"}>Login</Button>
        </div>
      </nav>

      {isSearchBarOpen && (
        <div className="absolute inset-x-0 top-full h-14 w-full bg-primary-100 px-4 py-2 xl:hidden">
          <form
            onSubmit={onSubmit}
            className="relative flex h-full items-center gap-3"
          >
            <SearchBar
              data-error={!!errors.query as boolean}
              className="h-full w-full pr-12 data-[error=true]:bg-red-100 data-[error=true]:text-red-500 data-[error=true]:outline-red-500"
              placeholder="Search anime..."
              {...register("query")}
            />
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2"
              type="submit"
            >
              <Search className="h-5 w-5 text-black" />
            </button>
          </form>
        </div>
      )}
    </header>
  );
}
