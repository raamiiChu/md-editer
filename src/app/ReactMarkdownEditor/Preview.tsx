import React from "react";
import MarkdownEditor from "@uiw/react-markdown-editor";

const Preview = ({markdown}:{markdown:string}) => {
  return (
    <section className="divide-y-2">
      <h1 className="text-3xl font-bold">Preview</h1>
      <MarkdownEditor.Markdown source={markdown} className="h-96 py-4" />
    </section>
  );
};

export default Preview;
