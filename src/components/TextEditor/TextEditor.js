import React, { useCallback, useEffect, useState } from "react";
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

export default function TextEditor() {
  const { id: documentId } = useParams();
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();

  useEffect(() => {
    const s = io("/", {
      withCredentials: true,
    });

    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket || !quill) {
      return;
    }

    socket.once("load-document", function (document) {
      quill.setContents(document);
      quill.enable();
    });

    socket.emit("get-document", documentId);
  }, [socket, quill, documentId])

  useEffect(() => {
    if (!socket || !quill) {
      return;
    }

    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents())
    }, SAVE_INTERVAL);

    return () => {
      clearInterval(interval);
    }
  }, [socket, quill]);

  useEffect(() => {
    if (!socket || !quill) {
      return;
    }

    const handler = function (delta) {
      quill.updateContents(delta);
    };

    socket.on("receive-changes", handler);

    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (!socket || !quill) {
      return;
    }

    function handler(delta, oldDelta, source) {
      if (source !== "user") {
        return;
      }

      socket.emit("send-changes", delta);
    };

    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  const wrapperRef = useCallback(wrapper => {
    if (wrapper == null) {
      return;
    }

    wrapper.innerHTML = "";

    const editor = document.createElement("div");
    wrapper.append(editor);

    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });

    q.disable();
    q.setText(CONSTANTS.TEXT_EDITOR_LOADING_MESSAGE);
    setQuill(q);
  }, []);

  return (
    <div className="container" ref={wrapperRef}></div>
  );
}
