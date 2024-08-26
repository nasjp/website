"use client";

import { contentColors, ContentType } from "@/lib/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header = () => {
  const pathname = usePathname();

  const getLinkClassName = (wants: string[], contentType: ContentType) => {
    if (wants.includes(pathname)) {
      return `${contentColors[contentType]}`;
    }
    return `text-gray-400`;
  };

  const getConditionalLink = (originalPath: string) => {
    return pathname === originalPath ? "/category/all" : originalPath;
  };

  return (
    <header>
      <div>
        <div className="fixed top-0 left-0 bg-white w-full h-12 z-5"></div>
      </div>
      <div className="fixed top-4 left-4 md:top-12 md:left-12 w-full z-10 bg-white">
        <Link href="/">
          <h1 className="font-bold">NASJP</h1>
        </Link>
      </div>
      <nav className="mt-8">
        <ul className="flex flex-col">
          <li
            className={getLinkClassName(
              ["/category/works", "/category/all"],
              "works",
            )}
            // className="text-red-500"
          >
            <Link href={getConditionalLink("/category/works")}>Works</Link>
          </li>
          <li
            className={getLinkClassName(["/", "/category/all"], "articles")}
            // className="text-green-500"
          >
            <Link href={getConditionalLink("/")}>Articles</Link>
          </li>
          <li
            className={getLinkClassName(
              ["/category/memos", "/category/all"],
              "memos",
            )}
            // className="text-blue-500"
          >
            <Link href={getConditionalLink("/category/memos")}>Memos</Link>
          </li>
          <li
            className={getLinkClassName(
              ["/category/about", "/category/all"],
              "about",
            )}
            // className="text-black"
          >
            <Link href={getConditionalLink("/category/about")}>About</Link>
          </li>
          <li className="text-gray-400">
            <Link href="/search">Search</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
