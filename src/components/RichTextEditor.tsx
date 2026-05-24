"use client";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import { useEffect, useState } from "react";

type Props = {
  value: string;
  onChange: (html: string) => void;
  rtl?: boolean;
  placeholder?: string;
  minHeight?: number;
};

const RTL_LANGUAGES = new Set(["he", "ar"]);

export function isRtlLanguage(lang: string): boolean {
  return RTL_LANGUAGES.has(lang);
}

const btnStyle: React.CSSProperties = {
  background: "transparent",
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "var(--border)",
  borderRadius: 6,
  padding: "4px 8px",
  fontSize: "0.8rem",
  color: "var(--text-secondary)",
  cursor: "pointer",
  lineHeight: 1,
  minWidth: 30,
};

const btnActiveStyle: React.CSSProperties = {
  ...btnStyle,
  background: "var(--accent-cyan-bg)",
  borderColor: "var(--accent-cyan)",
  color: "var(--accent-cyan)",
};

function ToolbarButton({
  active,
  onClick,
  title,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      title={title}
      style={active ? btnActiveStyle : btnStyle}
    >
      {children}
    </button>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  const setLink = () => {
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("URL (leave empty to remove):", prev ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const addImage = () => {
    const url = window.prompt("Image URL:");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 4,
        padding: 8,
        borderBottom: "1px solid var(--border)",
        background: "var(--bg-muted)",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
      }}
    >
      <ToolbarButton
        title="Bold"
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <b>B</b>
      </ToolbarButton>
      <ToolbarButton
        title="Italic"
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <i>I</i>
      </ToolbarButton>
      <ToolbarButton
        title="Strikethrough"
        active={editor.isActive("strike")}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <s>S</s>
      </ToolbarButton>
      <ToolbarButton
        title="Inline code"
        active={editor.isActive("code")}
        onClick={() => editor.chain().focus().toggleCode().run()}
      >
        {`</>`}
      </ToolbarButton>

      <span style={{ width: 1, background: "var(--border)", margin: "0 4px" }} />

      <ToolbarButton
        title="Heading 1"
        active={editor.isActive("heading", { level: 1 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        H1
      </ToolbarButton>
      <ToolbarButton
        title="Heading 2"
        active={editor.isActive("heading", { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        H2
      </ToolbarButton>
      <ToolbarButton
        title="Heading 3"
        active={editor.isActive("heading", { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        H3
      </ToolbarButton>
      <ToolbarButton
        title="Paragraph"
        active={editor.isActive("paragraph")}
        onClick={() => editor.chain().focus().setParagraph().run()}
      >
        ¶
      </ToolbarButton>

      <span style={{ width: 1, background: "var(--border)", margin: "0 4px" }} />

      <ToolbarButton
        title="Bullet list"
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        • List
      </ToolbarButton>
      <ToolbarButton
        title="Numbered list"
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        1. List
      </ToolbarButton>
      <ToolbarButton
        title="Quote"
        active={editor.isActive("blockquote")}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        ❝
      </ToolbarButton>
      <ToolbarButton
        title="Code block"
        active={editor.isActive("codeBlock")}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      >
        {`{ }`}
      </ToolbarButton>
      <ToolbarButton title="Horizontal rule" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        ―
      </ToolbarButton>

      <span style={{ width: 1, background: "var(--border)", margin: "0 4px" }} />

      <ToolbarButton
        title="Align left"
        active={editor.isActive({ textAlign: "left" })}
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
      >
        ⇤
      </ToolbarButton>
      <ToolbarButton
        title="Align center"
        active={editor.isActive({ textAlign: "center" })}
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
      >
        ↔
      </ToolbarButton>
      <ToolbarButton
        title="Align right"
        active={editor.isActive({ textAlign: "right" })}
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
      >
        ⇥
      </ToolbarButton>

      <span style={{ width: 1, background: "var(--border)", margin: "0 4px" }} />

      <ToolbarButton title="Link" active={editor.isActive("link")} onClick={setLink}>
        🔗
      </ToolbarButton>
      <ToolbarButton title="Insert image" onClick={addImage}>
        🖼
      </ToolbarButton>

      <span style={{ width: 1, background: "var(--border)", margin: "0 4px" }} />

      <ToolbarButton title="Undo" onClick={() => editor.chain().focus().undo().run()}>
        ↶
      </ToolbarButton>
      <ToolbarButton title="Redo" onClick={() => editor.chain().focus().redo().run()}>
        ↷
      </ToolbarButton>
      <ToolbarButton title="Clear formatting" onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}>
        ⌫fmt
      </ToolbarButton>
    </div>
  );
}

export function RichTextEditor({ value, onChange, rtl = false, placeholder, minHeight = 360 }: Props) {
  const [sourceMode, setSourceMode] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] },
        link: {
          openOnClick: false,
          autolink: true,
          HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
        },
      }),
      Image.configure({ inline: false }),
      Placeholder.configure({
        placeholder: placeholder ?? "Write or paste content...",
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: `blog-content${rtl ? " blog-content-rtl" : ""}`,
        style: `min-height:${minHeight}px;padding:18px 20px;`,
        dir: rtl ? "rtl" : "ltr",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Keep editor in sync if `value` is replaced externally (e.g. after AI generation).
  useEffect(() => {
    if (!editor) return;
    if (value !== editor.getHTML()) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
  }, [value, editor]);

  // Toggle direction without remounting the editor.
  useEffect(() => {
    if (!editor) return;
    const dom = editor.view.dom as HTMLElement;
    dom.setAttribute("dir", rtl ? "rtl" : "ltr");
    dom.classList.toggle("blog-content-rtl", rtl);
  }, [rtl, editor]);

  if (!editor) return null;

  return (
    <div
      style={{
        border: "1px solid var(--border)",
        borderRadius: 8,
        background: "var(--bg-card)",
        overflow: "hidden",
      }}
    >
      <Toolbar editor={editor} />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "4px 8px",
          borderBottom: "1px solid var(--border)",
          background: "var(--bg-card)",
        }}
      >
        <button
          type="button"
          onClick={() => setSourceMode((s) => !s)}
          style={{
            ...btnStyle,
            fontSize: "0.72rem",
            color: sourceMode ? "var(--accent-cyan)" : "var(--text-muted)",
          }}
          title="Toggle HTML source view"
        >
          {sourceMode ? "← Visual" : "View HTML"}
        </button>
      </div>

      {sourceMode ? (
        <textarea
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            editor.commands.setContent(e.target.value, { emitUpdate: false });
          }}
          rows={20}
          style={{
            width: "100%",
            background: "var(--bg-card)",
            color: "var(--text-primary)",
            border: "none",
            outline: "none",
            padding: 16,
            fontFamily: "ui-monospace, monospace",
            fontSize: "0.82rem",
            lineHeight: 1.5,
            resize: "vertical",
            minHeight,
          }}
        />
      ) : (
        <EditorContent editor={editor} />
      )}
    </div>
  );
}
