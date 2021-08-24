import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TextEditor from "../../components/TextEditor/";
import CONSTANTS from "../../constants";

function Document() {
  const { id } = useParams();

  async function handleDeleteOnClick() {
    try {
      const res = await axios.post("/", { id });

      console.log("res", res);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <button onClick={handleDeleteOnClick}>{CONSTANTS.DELETE_DOCUMENT}</button>
      <TextEditor />
    </div>
  );
}

export default Document;
