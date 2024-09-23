import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About | nasjp's website",
  description: "nasjp's website",
};

export default function About() {
  return (
    <div className="w-full max-w-xl">
      <div className="relative w-full max-w-screen-xl mb-8">
        <Image
          src="/about/images/about.jpg"
          alt="about"
          width={1080}
          height={1920}
          className="w-full h-auto object-contain"
          priority
          placeholder="blur"
          blurDataURL={"/blur.png"}
        />
        <div className="py-2">
          <div className="text-xs font-mono">
            Cardinal Fernando Niño de Guevara (1541–1609)
            by El Greco (Domenikos Theotokopoulos)
          </div>
          <div className="text-xs font-mono">ca. 1600</div>
        </div>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">About</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Yukihiro Taniguchi</li>
          <li>Software Engineer</li>
          <li>
            <a
            className="underline"
            href="https://kolumona.com" target="_blank" rel="noopener noreferrer">Kolumona</a>
          </li>
          <li>CTO</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">I like</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Go</li>
          <li>Typescript</li>
          <li>Next.js</li>
          <li>LLM</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-4">History</h2>
          <ul className="list-disc list-inside mb-4">
            <li>Sophia University, Economics (2014-2017)</li>
            <li>Mizuho Bank, Sales (2017-2018)</li>
            <li>Lifematics, Software Engineer (2018-2019)</li>
            <li>Elements, Software Engineer (2019-2024)</li>
            <li>Kolumona, CTO (2024-)</li>
          </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-4">Contact</h2>
        <ul className="list-disc list-inside mb-4">
          <li>
            <a href="https://twitter.com/nasjp_dev" target="_blank" rel="noopener noreferrer">Twitter</a>
          </li>
          <li>
            <a href="https://github.com/nasjp" target="_blank" rel="noopener noreferrer">Github</a>
          </li>
        </ul>
      </section>
    </div>
  );
}
