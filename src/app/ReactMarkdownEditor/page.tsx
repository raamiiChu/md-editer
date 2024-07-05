"use client";

import dynamic from "next/dynamic";
import React, { Suspense, useState } from "react";
import Preview from "./Preview";
import Link from "next/link";

const MarkdownEditor = dynamic(
  () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
  { ssr: false }
);

const mdStr = `# This is a H1  \n## This is a H2  \n###### This is a H6`;

const ReactMarkdownEditor = () => {
  const [markdown, setMarkdown] = useState(mdStr);

  return (
    <main className="space-y-4">
      <Link 
        href="/" 
        className="border-2 p-2 hover:bg-black hover:text-white transition-all">
          {"<"} Home
      </Link>
      <section className="divide-y-2">
        <h1 className="text-3xl font-bold">Editor</h1>
        <Suspense fallback={<p>Loading ... </p>}>
          <MarkdownEditor
            value={markdown}
            onChange={(value, viewUpdate) => {
              setMarkdown(value)
            }}
            className="h-96 py-4"
          />
        </Suspense>
      </section>

      <Preview markdown={markdown}></Preview>
    </main>
  );
};

export default ReactMarkdownEditor;
