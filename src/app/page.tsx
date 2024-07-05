import Link from "next/link";

export default function Home() {
  return (
    <main className="w-dvh h-dvh">
      <section className="h-full px-12 grid grid-cols-2 items-center text-center gap-x-8">
        <Link
          href="/MDXEditor"
          className="p-4 border-2 hover:bg-black hover:text-white transition-all"
        >
          MDX Editor
        </Link>
        <Link
          href="/ReactMarkdownEditor"
          className="p-4 border-2 hover:bg-black hover:text-white transition-all"
        >
          React Markdown Editor
        </Link>
      </section>
    </main>
  );
}
