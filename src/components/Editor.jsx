import { useState } from "react";

import { useEditor, EditorContent } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";

import Color from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";

import Placeholder from "@tiptap/extension-placeholder";

import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";

import CharacterCount from "@tiptap/extension-character-count";

import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";

import Link from "@tiptap/extension-link";
import YouTube from "@tiptap/extension-youtube";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableCell } from "@tiptap/extension-table-cell";
import Focus from "@tiptap/extension-focus";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Typography from "@tiptap/extension-typography";
import Toolbar from "./Toolbar";
import ThemeToggle from "./ThemeToggle";
import toast, { Toaster } from "react-hot-toast";

import "../styles/editor.css";

export default function Editor() {

  const [dark, setDark] = useState(true);

  const editor = useEditor({

    extensions: [

      StarterKit.configure({
        heading: true,
        bulletList: true,
        orderedList: true,
        blockquote: true,
        codeBlock: true,
        history: false,
        link: false,
        underline: false,
        dropcursor: false,
        gapcursor: false,
        horizontalRule: false,
      }),

      Underline,
      Highlight,
      Image,

      TextStyle,
      Color,
      FontFamily,

      Subscript,
      Superscript,

      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
      }),

      YouTube.configure({
        controls: true,
        nocookie: true,
      }),

      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,

      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),

      Placeholder.configure({
        placeholder: "⚡ Start typing futuristic content...",
      }),

      TaskList,

      TaskItem.configure({
        nested: true,
      }),

      CharacterCount.configure({
        limit: 10000,
      }),

      Focus,
      HorizontalRule,
      Typography,

    ],

    content:
      localStorage.getItem("tiptop-content") ||
      `
      <h1>⚡ TIPTOP CYBER EDITOR</h1>

      <p>
        Modern futuristic editor built using React + Vite + Tiptap.
      </p>

      <blockquote>
        Hacker style neon text editor.
      </blockquote>
      `,

    onUpdate({ editor }) {
      localStorage.setItem(
        "tiptop-content",
        editor.getHTML()
      );
    },

  });

  if (!editor) return null;

  const addImage = () => {

    const url = prompt("Enter Image URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className={dark ? "app dark" : "app light"}>
      <Toaster position="top-right" />

      <div className="editor-container">

        <div className="topbar">

          <h1 className="logo">
            TIPTOP EDITOR
          </h1>

          <ThemeToggle
            dark={dark}
            setDark={setDark}
          />

        </div>

        <Toolbar
          editor={editor}
          addImage={addImage}
        />

        <div className="editor-wrapper">

          <EditorContent
            editor={editor}
            className="editor"
          />

        </div>

        <div className="footer">

          <p>
            Characters:
            {" "}
            {editor.storage.characterCount.characters()}
          </p>

          <p>
            Words:
            {" "}
            {editor.storage.characterCount.words()}
          </p>

        </div>

      </div>

    </div>
  );
}