import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

const Editor = dynamic(() => import("./Editor"), {
  // Make sure we turn SSR off
  ssr: false,
});

const MDXEditor = () => {
  return (
    <div className="space-y-4">
      <Link
        href="/"
        className="border-2 p-2 hover:bg-black hover:text-white transition-all"
      >
        {"<"} Home
      </Link>
      <h1 className="text-3xl font-bold">Editor</h1>
      <div className="border-2">
        <Suspense fallback={<p>Loading ... </p>}>
          <Editor />
        </Suspense>
      </div>
    </div>
  );
};

export default MDXEditor;
