import {
  Bold,
  Italic,
  UnderlineIcon,
  Highlighter,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Quote,
  Undo2,
  Redo2,
  ImagePlus,
  Heading1,
  Heading2,
  Code2,
  Link as LinkIcon,
  Play,
  Table as TableIcon,
  Minus,
  Strikethrough,
  Subscript as SubscriptIcon,
  Superscript as SuperscriptIcon,
  Download,
} from "lucide-react";
import toast from "react-hot-toast";
import jsPDF from "jspdf";
import { saveAs } from "file-saver";

export default function Toolbar({ editor, addImage }) {
  if (!editor) return null;

  const addLink = () => {
    const url = prompt("Enter the URL");
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  };

  const addYouTube = () => {
    const url = prompt("Enter YouTube URL");
    if (url) {
      editor.chain().focus().setYoutubeVideo({ src: url }).run();
    }
  };

  const insertTable = () => {
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
    toast.success("Table inserted!");
  };

  const exportPDF = () => {
    try {
      const html = editor.getHTML();
      const doc = new jsPDF();
      doc.html(html, {
        callback: function () {
          doc.save("document.pdf");
          toast.success("PDF exported successfully!");
        },
        x: 10,
        y: 10,
      });
    } catch (error) {
      toast.error("Error exporting PDF");
    }
  };

  const exportHTML = () => {
    try {
      const html = editor.getHTML();
      const element = document.createElement("a");
      element.setAttribute("href", "data:text/html;charset=utf-8," + encodeURIComponent(html));
      element.setAttribute("download", "document.html");
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      toast.success("HTML exported successfully!");
    } catch (error) {
      toast.error("Error exporting HTML");
    }
  };

  return (
    <div className="toolbar">

      <button onClick={() => editor.chain().focus().toggleBold().run()}>
        <Bold size={18} />
      </button>

      <button onClick={() => editor.chain().focus().toggleItalic().run()}>
        <Italic size={18} />
      </button>

      <button onClick={() => editor.chain().focus().toggleUnderline().run()}>
        <UnderlineIcon size={18} />
      </button>

      <button onClick={() => editor.chain().focus().toggleHighlight().run()}>
        <Highlighter size={18} />
      </button>

      <button
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
      >
        <Heading1 size={18} />
      </button>

      <button
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading2 size={18} />
      </button>

      <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
        <List size={18} />
      </button>

      <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        <ListOrdered size={18} />
      </button>

      <button onClick={() => editor.chain().focus().toggleBlockquote().run()}>
        <Quote size={18} />
      </button>

      <button onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
        <Code2 size={18} />
      </button>

      <button onClick={() => editor.chain().focus().undo().run()}>
        <Undo2 size={18} />
      </button>

      <button onClick={() => editor.chain().focus().redo().run()}>
        <Redo2 size={18} />
      </button>

      <button
        onClick={() =>
          editor.chain().focus().setTextAlign("left").run()
        }
      >
        <AlignLeft size={18} />
      </button>

      <button
        onClick={() =>
          editor.chain().focus().setTextAlign("center").run()
        }
      >
        <AlignCenter size={18} />
      </button>

      <button
        onClick={() =>
          editor.chain().focus().setTextAlign("right").run()
        }
      >
        <AlignRight size={18} />
      </button>

      <button onClick={addImage}>
        <ImagePlus size={18} />
      </button>

      <button onClick={addLink}>
        <LinkIcon size={18} />
      </button>

      <button onClick={() => editor.chain().focus().toggleStrike().run()}>
        <Strikethrough size={18} />
      </button>

      <button onClick={() => editor.chain().focus().toggleSubscript().run()}>
        <SubscriptIcon size={18} />
      </button>

      <button onClick={() => editor.chain().focus().toggleSuperscript().run()}>
        <SuperscriptIcon size={18} />
      </button>

      <button onClick={addYouTube}>
        <Play size={18} />
      </button>

      <button onClick={insertTable}>
        <TableIcon size={18} />
      </button>

      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <Minus size={18} />
      </button>

      <button onClick={exportPDF}>
        <Download size={18} />
      </button>

    </div>
  );
}