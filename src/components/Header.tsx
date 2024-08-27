"use client";
import { contentColors, ContentType } from "@/lib/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isRootPath = pathname === "/";

  const getLinkClassName = (wants: string[], contentType: ContentType) => {
    if (wants.includes(pathname)) {
      return `${contentColors[contentType]}`;
    }
    return `text-gray-400`;
  };

  const getConditionalLink = (originalPath: string) => {
    return pathname === originalPath ? "/category/all" : originalPath;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <div className="fixed top-0 left-0 bg-white w-full h-12 z-10">
        <div className="m-4 md:m-12 bg-white flex justify-between items-center">
          <Link href="/">
            <h1 className="font-bold">NASJP</h1>
          </Link>
          {!isRootPath && (
            <button onClick={toggleMenu} className="md:hidden font-bold">
              {isMenuOpen ? "CLOSE" : "MENU"}
            </button>
          )}
        </div>
      </div>
      <div className="h-[calc(1.6rem)] "></div>
      <nav className={`${!isRootPath && !isMenuOpen ? "hidden md:block" : ""}`}>
        <ul className="flex flex-col">
          <li
            className={getLinkClassName(
              ["/category/works", "/category/all"],
              "works",
            )}
            // className="text-red-400"
          >
            <Link href={getConditionalLink("/category/works")}>Works</Link>
          </li>
          <li
            className={getLinkClassName(["/", "/category/all"], "articles")}
            // className="text-green-400"
          >
            <Link href={getConditionalLink("/")}>Articles</Link>
          </li>
          <li
            className={getLinkClassName(
              ["/category/memos", "/category/all"],
              "memos",
            )}
            // className="text-blue-400"
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
