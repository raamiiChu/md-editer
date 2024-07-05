"use client";

import React, { useState } from "react";
import i18next from "i18next";
import * as zhTw from "./zh-tw.json" assert { type: "json" };

import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  toolbarPlugin,
  MDXEditor,
  UndoRedo,
  BoldItalicUnderlineToggles,
  InsertCodeBlock,
  ConditionalContents,
  InsertSandpack,
  ShowSandpackInfo,
  ChangeCodeMirrorLanguage,
  sandpackPlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  InsertTable,
  tablePlugin,
  Separator,
  ListsToggle,
  type SandpackConfig,
  type MDXEditorMethods,
  BlockTypeSelect,
  imagePlugin,
  InsertImage,
  CreateLink,
  linkDialogPlugin,
} from "@mdxeditor/editor";

import "@mdxeditor/editor/style.css";

void i18next.init({
  lng: "zhTw", // if you're using a language detector, do not define the lng option
  debug: true,
  resources: {
    zhTw: {
      translation: zhTw,
    },
  },
});

async function imageUploadHandler(image: File) {
  const formData = new FormData();
  formData.append("image", image);
  // send the file to your server and return
  // the URL of the uploaded image in the response
  const response = await fetch("/uploads/new", {
    method: "POST",
    body: formData,
  });
  const json = (await response.json()) as { url: string };
  return json.url;
}

const defaultSnippetContent = `
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`.trim();

const simpleSandpackConfig: SandpackConfig = {
  defaultPreset: "react",
  presets: [
    {
      label: "React",
      name: "react",
      meta: "live react",
      sandpackTemplate: "react",
      sandpackTheme: "light",
      snippetFileName: "/App.js",
      snippetLanguage: "jsx",
      initialSnippetContent: defaultSnippetContent,
    },
  ],
};

interface EditorProps {
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
}

const mdStr = `# This is a H1  \n## This is a H2  \n###### This is a H6`;

const Editor = ({ editorRef }: EditorProps) => {
  const [markdown, setMarkdown] = useState(mdStr);

  return (
    <MDXEditor
      contentEditableClassName="prose h-96 overflow-y-scroll"
      onChange={(e) => setMarkdown(e)}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        tablePlugin(),
        imagePlugin({ imageUploadHandler }),
        linkDialogPlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
        sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
        codeMirrorPlugin({
          codeBlockLanguages: { txt: "Text", js: "JavaScript", css: "CSS" },
        }),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <UndoRedo />
              <Separator />
              <BoldItalicUnderlineToggles />
              <ConditionalContents
                options={[
                  {
                    when: (editor) => editor?.editorType === "codeblock",
                    contents: () => <ChangeCodeMirrorLanguage />,
                  },
                  {
                    when: (editor) => editor?.editorType === "sandpack",
                    contents: () => <ShowSandpackInfo />,
                  },
                  {
                    fallback: () => (
                      <>
                        <InsertCodeBlock />
                        <InsertSandpack />
                      </>
                    ),
                  },
                ]}
              />
              <Separator />
              <ListsToggle />
              <InsertTable />
              <InsertImage />
              <CreateLink />
              <Separator />
              <BlockTypeSelect />
            </>
          ),
        }),
      ]}
      ref={editorRef}
      markdown={markdown}
      translation={(key, defaultValue, interpolations) => {
        return i18next.t(key, defaultValue, interpolations) as string;
      }}
    />
  );
};

export default Editor;
