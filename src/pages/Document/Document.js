import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { deleteDocument, updateDocument } from "../../api/firebaseAuth";

import TextEditor from "../../components/TextEditor/";
import CONSTANTS from "../../constants";

function Document({ user }) {
  const { id } = useParams();

  const [quill, setQuill] = useState();

  async function handleSaveOnClick() {
    try {
      await updateDocument(id, quill.getContents());
    } catch (err) {
      alert(err);
    }
  }

  async function handleDeleteOnClick() {
    try {
      await deleteDocument(id);
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div>
      <button onClick={handleSaveOnClick}>{CONSTANTS.SAVE_DOCUMENT}</button>
      <button onClick={handleDeleteOnClick}>{CONSTANTS.DELETE_DOCUMENT}</button>
      <TextEditor user={user} quill={quill} setQuill={(q) => setQuill(q)} />
    </div>
  );
}

export default Document;
