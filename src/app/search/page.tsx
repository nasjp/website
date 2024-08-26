"use client";

import {
  ALGOLIA_APP_ID,
  ALGOLIA_INDEX_NAME,
  ALGOLIA_READ_API_KEY,
} from "@/lib/algolia";
import algoliasearch from "algoliasearch/lite";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Hit as AlgoliaHit } from "react-instantsearch-core";
import { connectSearchBox, Hits, InstantSearch } from "react-instantsearch-dom";

const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_READ_API_KEY);

interface SearchBoxProps {
  refine: (value: string) => void;
  currentRefinement: string;
}

const SearchBox = connectSearchBox(
  ({ refine, currentRefinement }: SearchBoxProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, []);

    return (
      <div className="max-w-48 mb-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            ref={inputRef}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-gray-400 focus:border-gray-400 sm:text-sm"
            value={currentRefinement}
            type="text"
            placeholder=""
            onChange={(e) => refine(e.currentTarget.value)}
          />
        </div>
      </div>
    );
  },
);

type HitProps = {
  hit: AlgoliaHit;
};

const Hit: React.FC<HitProps> = ({ hit }) => (
  <Link href={`/contents/${hit.objectID}`} passHref legacyBehavior>
    <div className="w-full mx-auto mb-4 cursor-pointer">
      <div className="flex flex-col items-center">
        <div className="w-full flex justify-start mb-2 h-[80px]">
          <Image
            src={hit.imageUrl}
            alt={hit.title}
            width={80}
            height={80}
            style={{ objectFit: "cover", width: "auto", height: "80px" }}
            loading="lazy"
            placeholder="blur"
            blurDataURL={"/blur.png"}
          />
        </div>
        <div className="w-full text-left">
          <h2 className="font-semibold mb-1">{hit.title}</h2>
          <p className="text-gray-600 text-sm whitespace-nowrap">
            {new Date(hit.date).toISOString()}
          </p>
          <p className="text-gray-600 text-sm text-gray-300">{hit.category}</p>
        </div>
      </div>
    </div>
  </Link>
);

const SearchPage: React.FC = () => {
  const [searchState, setSearchState] = useState({});

  return (
    <div className="">
      <InstantSearch
        searchClient={searchClient}
        indexName={ALGOLIA_INDEX_NAME}
        searchState={searchState}
        onSearchStateChange={setSearchState}
      >
        <SearchBox />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Hits hitComponent={Hit} />
        </div>
      </InstantSearch>
    </div>
  );
};

export default SearchPage;
