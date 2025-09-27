"use client";

// External imports
import { Bug, GitFork, Search, Star, Users } from "lucide-react";

// Internal imports
import { HeroTitle } from "./_components/heroTitle";
import { BadgeLabel } from "./_components/badgeLabel";

import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import z from "zod";
import { SearchValidateSchema } from "@/lib/validations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Main Hero component combining all elements
 */
export function Hero() {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<z.infer<typeof SearchValidateSchema>>({
    resolver: zodResolver(SearchValidateSchema),
    defaultValues: {
      query: "",
    },
  });

  // Function to redirect to search page
  const onSubmit = handleSubmit(({ query }) => {
    router.push(`/search?keyword=${query}`);
  });

  return (
    <section
      className="relative overflow-hidden h-screen"
      id="home"
      aria-labelledby="hero-heading"
    >
      {/* Background elements */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"
        aria-hidden="true"
      />
      <div
        className="absolute top-0 right-0 -z-10 h-16 w-16 rounded-full bg-yellow-400/20 blur-2xl md:h-72 md:w-72"
        aria-hidden="true"
      />
      <div
        className="bg-primary/20 absolute bottom-16 left-0 -z-10 h-36 w-36 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 py-32 sm:px-6 sm:py-40 md:min-h-screen lg:min-h-screen lg:px-8">
        <div className="flex flex-col items-center text-center">
          <BadgeLabel text="Beta Version" />

          <HeroTitle />

          <p className="text-muted-foreground mt-8 max-w-2xl text-center text-lg">
            Watch thousands of anime episodes, sub & dub, updated every season.
            Stream anytime, anywhere without limits.
          </p>

          {/* Search form */}
          <form onSubmit={onSubmit} className="mt-8 flex gap-3">
            <Input
              type="text"
              data-error={!!errors.query as boolean}
              placeholder="Search anime..."
              className="h-12 w-70 text-base data-[error=true]:bg-red-100 data-[error=true]:text-red-500 data-[error=true]:outline-red-500"
              {...register("query")}
            />
            <Button className="!h-12 aspect-square" type="submit">
              <Search className="!h-5 !w-5 text-black/80" />
            </Button>
          </form>

          {/* CTA Button */}
          <Link
            href="/home"
            className={cn(
              buttonVariants({
                variant: "default",
                className:
                  "mt-6 w-full md:w-max !px-10 !py-7 text-xl font-semibold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white shadow-lg hover:opacity-90 transition-all",
              }),
            )}
          >
            Watch Anime!
          </Link>

          {/* Repo stats bar */}
          <div
            className="border-border/50 bg-background/50 mt-16 flex flex-wrap items-center justify-center gap-6 rounded-lg border p-4 sm:gap-10 md:gap-16"
            aria-label="Repository statistics"
          >
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5">
                <Star className="h-4 w-4 text-yellow-400" aria-hidden="true" />
                <p className="text-lg font-bold">1.2k</p>
              </div>
              <p className="text-muted-foreground text-xs">Stars</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5">
                <GitFork className="h-4 w-4 text-blue-400" aria-hidden="true" />
                <p className="text-lg font-bold">320</p>
              </div>
              <p className="text-muted-foreground text-xs">Forks</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5">
                <Bug className="h-4 w-4 text-red-500" aria-hidden="true" />
                <p className="text-lg font-bold">42</p>
              </div>
              <p className="text-muted-foreground text-xs">Open Issues</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5">
                <Users className="h-4 w-4 text-green-500" aria-hidden="true" />
                <p className="text-lg font-bold">15</p>
              </div>
              <p className="text-muted-foreground text-xs">Contributors</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
