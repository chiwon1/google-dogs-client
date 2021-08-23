import React, { useCallback } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "./styles.css";

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
]

function TextEditor() {
  // TODO : 작동원리 파악
  const wrapperRef = useCallback((wrapper) => {
    if (wrapper === null) {
      return;
    }

    wrapper.innerHTML = "";

    const editor = document.createElement("div");

    wrapper.append(editor);

    new Quill(editor, { theme: "snow", modules: { toolbar: TOOLBAR_OPTIONS } });
  }, []);

  return (
    <div>
      <div className="container" ref={wrapperRef}></div>
    </div>
  );
}

export default TextEditor;
