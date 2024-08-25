"use client";

import { useState } from "react";
import useSWR from "swr";
import { Win95Input, Win95List, Win95ListItem } from "./Win95Components";
import Link from "next/link";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function ClientSearchForm() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: searchResults, error } = useSWR(
    searchTerm ? `/api/search?q=${encodeURIComponent(searchTerm)}` : null,
    fetcher
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const showResults = searchTerm && !error && searchResults;

  return (
    <div className="mb-4">
      <Win95Input type="text" placeholder="Search..." aria-label="Search articles" onChange={handleSearch} />
      {showResults && (
        <Win95List>
          {searchResults.length > 0 ? (
            searchResults.map((article: { slug: string; title: string }) => (
              <Link key={article.slug} href={`/articles/${article.slug}`}>
                <Win95ListItem>
                  <span className="block truncate">{article.title}</span>
                </Win95ListItem>
              </Link>
            ))
          ) : (
            <Win95ListItem>
              <span className="block truncate">No results found</span>
            </Win95ListItem>
          )}
        </Win95List>
      )}
    </div>
  );
}
