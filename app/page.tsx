"use client";

import { useToast } from "@/hooks/use-toast";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const docs = [
  {
    name: "Angular",
    image: "/icons/angular-icon.svg",
    url: "angular",
  },
  {
    name: "Biome",
    image: "/icons/biomejs-icon.svg",
    url: "biomejs",
  },
  {
    name: "Chart.js",
    image: "/icons/chartjs.svg",
    url: "chartjs",
  },
  {
    name: "Effect",
    image: "/icons/effect-icon.svg",
    url: "effect",
  },
  {
    name: "FastAPI",
    image: "/icons/fastapi-icon.svg",
    url: "fastapi",
  },
  // {
  //   name: "Hono",
  //   image: "/icons/hono.svg",
  //   url: "hono",
  // },
  {
    name: "htmx",
    image: "/icons/htmx-icon.svg",
    url: "htmx",
  },
  // {
  //   name: "Million",
  //   image: "/icons/million-icon.svg",
  //   url: "million",
  // },
  {
    name: "Next.js",
    image: "/icons/nextjs-icon.svg",
    url: "nextjs",
  },
  // {
  //   name: "Nuxt",
  //   image: "/icons/nuxt-icon.svg",
  //   url: "nuxt",
  // },
  // {
  //   name: "Panda",
  //   image: "/icons/pandacss-icon.svg",
  //   url: "panda",
  // },
  // {
  //   name: "shadcn/ui",
  //   image: "/icons/shadcnui-icon.svg",
  //   url: "shadcnui",
  // },
  // {
  //   name: "Solidity",
  //   image: "/icons/solidity.svg",
  //   url: "solidity",
  // },
  // {
  //   name: "Solid",
  //   image: "/icons/solidjs-icon.svg",
  //   url: "solid",
  // },
  // {
  //   name: "Svelte",
  //   image: "/icons/svelte-icon.svg",
  //   url: "svelte",
  // },
  // {
  //   name: "SWC",
  //   image: "/icons/swc.svg",
  //   url: "swc",
  // },
  // {
  //   name: "SWR",
  //   image: "/icons/swr.svg",
  //   url: "swr",
  // },
  // {
  //   name: "Tailwind",
  //   image: "/icons/tailwindcss-icon.svg",
  //   url: "tailwind",
  // },
  // {
  //   name: "three.js",
  //   image: "/icons/threejs.svg",
  //   url: "threejs",
  // },
  // {
  //   name: "Turbopack",
  //   image: "/icons/turbopack-icon.svg",
  //   url: "turbopack",
  // },
  // {
  //   name: "Turborepo",
  //   image: "/icons/turborepo-icon.svg",
  //   url: "turborepo",
  // },
  // {
  //   name: "Webpack",
  //   image: "/icons/webpack.svg",
  //   url: "webpack",
  // },
  // {
  //   name: "Zod",
  //   image: "/icons/zod.svg",
  //   url: "zod",
  // },
];

export default function Home() {
  const [files, setFiles] = useState<
    {
      url: string;
      content: string;
    }[]
  >();
  const { toast } = useToast();

  useEffect(() => {
    async function init() {
      const requests = await Promise.all(
        docs.map(async (doc) => {
          const request = await fetch(`/docs/${doc.url}.md`);
          const content = await request.text();

          return {
            url: doc.url,
            content,
          };
        })
      );

      setFiles(requests);
    }

    init();
  }, []);

  return (
    <div className="mb-16 text-center">
      <header className="bg-neutral-700 flex mb-8 p-4 justify-between sticky text-white">
        <h1 className="flex gap-2 items-center text-xl">
          <div className="flex">
            <div className="bg-white rounded-full w-2 h-8" />
            <div className="bg-white rounded-full w-6 h-8" />
          </div>
          Information Overload
        </h1>
        <div className="flex items-center gap-2">
          <Link
            href="https://github.com/ctate/io"
            rel="noreferrer noopener"
            target="_blank"
          >
            <GitHubLogoIcon height={32} width={32} />
          </Link>
          {/* <input
            className="px-4 py-2 rounded-lg"
            placeholder="Search docs..."
          />
          <Search /> */}
        </div>
      </header>
      <div>
        <ul className="grid grid-cols-1 gap-16 md:grid-cols-3 sm:grid-cols-2">
          {docs.map((doc) => (
            <li className="flex flex-col items-center gap-4" key={doc.url}>
              <Image
                className="h-32 object-fit w-32"
                alt={doc.name}
                height={128}
                src={doc.image}
                width={128}
              />
              <div className="text-xl">{doc.name}</div>
              <div className="flex gap-2">
                <button
                  className="border-neutral-700 bg-neutral-700 px-4 py-2 rounded-lg text-white text-xs w-24 hover:bg-neutral-500"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      files?.find((file) => file.url === doc.url)?.content ?? ""
                    );

                    toast({
                      title: "Copied!",
                      description: (
                        <>
                          The entire <b>{doc.name}</b> documentation is on your
                          clipboard
                        </>
                      ),
                    });
                  }}
                >
                  Copy
                </button>
                <button
                  className="border px-4 py-2 rounded-lg text-black text-xs w-24 hover:border-gray-300"
                  onClick={() => {
                    const blob = new Blob(
                      [
                        files?.find((file) => file.url === doc.url)?.content ??
                          "",
                      ],
                      { type: "text/markdown" }
                    );
                    const link = document.createElement("a");
                    link.href = URL.createObjectURL(blob);
                    link.download = `${doc.url}.md`;
                    link.click();
                    URL.revokeObjectURL(link.href);
                  }}
                >
                  Download
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
