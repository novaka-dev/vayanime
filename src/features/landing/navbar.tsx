import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { LANDING_NAV_ITEMS } from "@/lib/constants";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-8 z-50">
      <div className="flex h-16 items-center justify-start md:justify-center gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          <Breadcrumb>
            <BreadcrumbList>
              {/* Mobile menu pakai dropdown */}
              <BreadcrumbItem className="md:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger className="hover:text-foreground">
                    <BreadcrumbEllipsis />
                    <span className="sr-only">Toggle menu</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {LANDING_NAV_ITEMS.map((item) => (
                      <DropdownMenuItem key={item.href} asChild>
                        <Link href={item.href}>{item.label}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </BreadcrumbItem>

              {/* Desktop breadcrumb */}
              {LANDING_NAV_ITEMS.map((item, index) => (
                <div key={item.href} className="flex items-center gap-4 text-">
                  <BreadcrumbItem className="max-md:hidden">
                    <BreadcrumbLink asChild>
                      <Link href={item.href}>{item.label}</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {index < LANDING_NAV_ITEMS.length - 1 && (
                    <BreadcrumbSeparator className="max-md:hidden">
                      /
                    </BreadcrumbSeparator>
                  )}
                </div>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
    </header>
  );
}
