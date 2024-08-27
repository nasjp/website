"use client";
import { contentColors, ContentType } from "@/lib/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isNotContentsPath = !pathname.includes("/contents/");

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
          {!isNotContentsPath && (
            <button onClick={toggleMenu} className="md:hidden font-bold">
              {isMenuOpen ? "CLOSE" : "MENU"}
            </button>
          )}
        </div>
      </div>
      <div className="h-[calc(1.6rem)] "></div>
      <nav
        className={`${!isNotContentsPath && !isMenuOpen ? "hidden md:block" : ""}`}
      >
        <ul className="flex flex-col">
          <li>
            <Link href={getConditionalLink("/category/works")}>
              <span
                className={getLinkClassName(
                  ["/category/works", "/category/all"],
                  "works",
                )}
                // className="text-red-500"
              >
                Works
              </span>
            </Link>
          </li>
          <li>
            <Link href={getConditionalLink("/")}>
              <span
                className={getLinkClassName(["/", "/category/all"], "articles")}
                // className="text-green-500"
              >
                Articles
              </span>
            </Link>
          </li>
          <li>
            <Link href={getConditionalLink("/category/memos")}>
              <span
                className={getLinkClassName(
                  ["/category/memos", "/category/all"],
                  "memos",
                )}
                // className="text-blue-500"
              >
                Memos
              </span>
            </Link>
          </li>
          <li>
            <Link href={getConditionalLink("/category/about")}>
              <span
                className={getLinkClassName(
                  ["/category/about", "/category/all"],
                  "about",
                )}
              >
                About
              </span>
            </Link>
          </li>
          <li className="text-gray-400">
            <Link href="/search">Search</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
