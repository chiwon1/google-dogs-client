import React, { useEffect, useCallback, useRef, useMemo } from "react";
import { useParams } from "react-router-dom";
import "./styles.css";

import { io } from "socket.io-client";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import QuillCursors from "quill-cursors";
import randomColor from "randomcolor";

import { selectionChangeHandler } from "../../utills";
import CONSTANTS from "../../constants";

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

function TextEditor({ user, quill, handleQuill }) {
  const socketRef = useRef(null);

  const { id: documentId } = useParams();
  const cursorSelf = useMemo(() => quill ? quill.getModule("cursors") : null, [quill]);


  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(process.env.REACT_APP_HOST_API);
    }

    const { current: socket } = socketRef;

    socket.on("connect", (socket) => {
      console.log("connect");
    });

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    const { current: socket } = socketRef;

    if (!socket || !quill || !cursorSelf) {
      return;
    }

    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents());
    }, CONSTANTS.SAVE_INTERVAL);

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

    socket.on("user-join", (socket) => {
      cursorSelf.createCursor(socket.id, socket.nickname, randomColor());
    });

    socket.on("load-collaborator", (sockets) => {
      sockets.forEach(socket => {
        cursorSelf.createCursor(socket.id, socket.nickname, randomColor());
      });
    });

    socket.on("receive-selection", ({ range, source, id }) => {
      selectionChangeHandler(cursorSelf, id)(range, null, source);
    });

    quill.on("selection-change", (range, _, source) => {
      socket.emit("send-selection", { range, source, id: socket.id });
    });

    const { uid, displayName } = user ? user : { uid: null, displayName: null };

    socket.emit("get-document", { documentId, creator: uid, displayName });
    return () => {
      clearInterval(interval);
      socket.off("receive-changes");
      quill.off("text-change");
    }
  }, [documentId, quill, user, cursorSelf]);

  const wrapperRef = useCallback(wrapper => {
    if (!wrapper) {
      return;
    }

    wrapper.innerHTML = "";

    const editor = document.createElement("div");
    wrapper.append(editor);
    Quill.register("modules/cursors", QuillCursors);
    const quill = new Quill(editor, {
      theme: "snow",
      modules: {
        toolbar: TOOLBAR_OPTIONS,
        cursors: {
          transformOnTextChange: true,
        },
      },
    });

    quill.disable();
    quill.setText(CONSTANTS.TEXT_EDITOR_LOADING_MESSAGE);
    handleQuill(quill);
  }, []);

  return <div className="container" ref={wrapperRef}></div>;
}

export default TextEditor;
