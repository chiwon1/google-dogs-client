import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";

import "./styles.css";

import Quill from "quill";
import "quill/dist/quill.snow.css";

import { io } from "socket.io-client";

import CONSTANTS from "../../constants";

const SAVE_INTERVAL = 20000;

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
];

function TextEditor() {
  const socketRef = useRef(null);

  const { id: documentId } = useParams();
  const [quill, setQuill] = useState();

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(process.env.REACT_APP_HOST_API);
    }

    const { current: socket } = socketRef;

    socket.on("connect", () => {
      console.log("connect");
    });

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    const { current: socket } = socketRef;

    if (!socket || !quill) {
      return;
    }

    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents())
    }, SAVE_INTERVAL);

    socket.once("load-document", function (document) {
      quill.setContents(document);
      quill.enable();
    });

    socket.on("receive-changes", function (delta) {
      quill.updateContents(delta);
    });

    quill.on("text-change", function (delta, oldDelta, source) {
      if (source !== "user") {
        return;
      }

      socket.emit("send-changes", delta);
    });

    socket.emit("get-document", documentId);

    return () => {
      clearInterval(interval);

      socket.off("receive-changes");
      quill.off("text-change");
    }
  }, [documentId, quill]);

  const wrapperRef = useCallback(wrapper => {
    if (!wrapper) {
      return;
    }

    wrapper.innerHTML = "";

    const editor = document.createElement("div");
    wrapper.append(editor);

    const quill = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });

    quill.disable();
    quill.setText(CONSTANTS.TEXT_EDITOR_LOADING_MESSAGE);
    setQuill(quill);
  }, []);

  return <div className="container" ref={wrapperRef}></div>;
}

export default TextEditor;
