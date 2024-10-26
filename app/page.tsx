"use client";

import { useToast } from "@/hooks/use-toast";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const docs = [
  {
    name: "Angular",
    image: "/icons/angular-icon.svg",
    url: "/angular",
  },
  {
    name: "Biome",
    image: "/icons/biomejs-icon.svg",
    url: "/biome",
  },
  {
    name: "Chart.js",
    image: "/icons/chartjs.svg",
    url: "/chartjs",
  },
  {
    name: "Claude",
    image: "/icons/claude-icon.svg",
    url: "/claude",
  },
  {
    name: "daisyUI",
    image: "/icons/daisyUI-icon.svg",
    url: "daisyUI",
  },
  {
    name: "Django",
    image: "/icons/django-icon.svg",
    url: "django",
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
  {
    name: "Hono",
    image: "/icons/hono.svg",
    url: "hono",
  },
  {
    name: "htmx",
    image: "/icons/htmx-icon.svg",
    url: "/htmx",
  },
  {
    name: "Linear",
    image: "/icons/linear-icon.svg",
    url: "/linear",
  },
  {
    name: "Million",
    image: "/icons/million-icon.svg",
    url: "/million",
  },
  {
    name: "Next.js",
    image: "/icons/nextjs-icon.svg",
    url: "/next",
  },
  {
    name: "Nuxt",
    image: "/icons/nuxt-icon.svg",
    url: "/nuxt",
  },
  {
    name: "OpenAI",
    image: "/icons/openai-icon.svg",
    url: "/openai",
  },
  {
    name: "Panda",
    image: "/icons/pandacss-icon.svg",
    url: "/panda",
  },
  {
    name: "shadcn/ui",
    image: "/icons/shadcnui-icon.svg",
    url: "/shadcnui",
  },
  {
    name: "Solidity",
    image: "/icons/solidity.svg",
    url: "/solidity",
  },
  {
    name: "Solid",
    image: "/icons/solidjs-icon.svg",
    url: "/solid",
  },
  {
    name: "Svelte",
    image: "/icons/svelte-icon.svg",
    url: "/svelte",
  },
  {
    name: "SWC",
    image: "/icons/swc.svg",
    url: "/swc",
  },
  {
    name: "SWR",
    image: "/icons/swr.svg",
    url: "/swr",
  },
  {
    name: "Tailwind",
    image: "/icons/tailwindcss-icon.svg",
    url: "/tailwind",
  },
  {
    name: "three.js",
    image: "/icons/threejs.svg",
    url: "/threejs",
  },
  {
    name: "Turbopack",
    image: "/icons/turbopack-icon.svg",
    url: "/turbopack",
  },
  {
    name: "Turborepo",
    image: "/icons/turborepo-icon.svg",
    url: "/turborepo",
  },
  {
    name: "Vercel",
    image: "/icons/vercel-icon.svg",
    url: "/vercel",
  },
  {
    name: "Webpack",
    image: "/icons/webpack.svg",
    url: "/webpack",
  },
  {
    name: "xAI",
    image: "/icons/xai-icon.svg",
    url: "/xai",
  },
  {
    name: "Zod",
    image: "/icons/zod.svg",
    url: "/zod",
  },
];

export default function Home() {
  const { toast } = useToast();

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
          <input
            className="px-4 py-2 rounded-lg"
            placeholder="Search docs..."
          />
          <Search />
        </div>
      </header>
      <div>
        <ul className="grid grid-cols-3 gap-16">
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
                <Link
                  className="border px-4 py-2 rounded-lg text-black text-xs w-24 hover:border-gray-300"
                  href={doc.url}
                >
                  Download
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
