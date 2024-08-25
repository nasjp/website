"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Anchor = {
  element: string;
  id: string;
  text: string;
  location: number;
};

type ResultData = {
  anchors: Anchor[];
  content: string;
  excerpt: string;
  filters: Record<string, unknown>;
  locations: number[];
  meta: {
    title: string;
  };
  raw_content: string;
  raw_url: string;
  sub_results: unknown[];
  url: string;
  weighted_locations: unknown[];
  word_count: number;
};

type ResultType = {
  id: string;
  data: () => Promise<ResultData>;
};

export interface PagefindWindow extends Window {
  pagefind?: {
    search: (query: string) => Promise<{ results: ResultType[] }>;
  };
}

declare const window: PagefindWindow;

export default function SearchPage() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<ResultType[]>([]);

  useEffect(() => {
    const loadPagefind = async () => {
      if (!window.pagefind) {
        try {
          window.pagefind = await import(
            // @ts-expect-error pagefind.js generated after build
            /* webpackIgnore: true */ "/pagefind/pagefind.js"
          );
        } catch (e) {
          window.pagefind = {
            search: async () => ({ results: [] as ResultType[] }),
          };
        }
      }
    };
    loadPagefind();
  }, []);

  // 検索結果を取得
  async function handleSearch() {
    if (window.pagefind) {
      const search = await window.pagefind.search(query);
      setResults(search.results);
    }
  }

  useEffect(() => {
    handleSearch();
  }, [query]);

  return (
    <div>
      <input
        type="text"
        placeholder="..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="px-1 border border-gray-300 mb-6 focus:outline-none focus:ring-2 focus:ring-gray-200"
      />
      <div id="results" className="space-y-6">
        {results.map((result) => (
          <Result key={result.id} result={result} />
        ))}
      </div>
    </div>
  );
}

const Result = ({ result }: { result: ResultType }) => {
  const [data, setData] = useState<ResultData | null>(null);

  const replaceUrl = (url: string) => {
    return url.replace(/^\/server\/app\//, "").replace(/\.html$/, "") || "/";
  };

  useEffect(() => {
    async function fetchData() {
      const resultData = await result.data();
      resultData.url = replaceUrl(resultData.url);
      setData(resultData);
    }
    fetchData();
  }, [result]);

  if (!data) return null;

  const include = (result: ResultData) => {
    return result.url.includes("contents");
  };

  if (!include(data)) return null;

  return (
    <div className="mb-4">
      <Link href={data.url} className="block text-inherit no-underline">
        <p
          className="text-sm text-gray-600"
          dangerouslySetInnerHTML={{ __html: data.excerpt }}
        />
      </Link>
    </div>
  );
};
