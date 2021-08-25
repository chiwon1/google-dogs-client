import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getDocuments } from "../../api/documents";
import "./styles.css";

function Home({ user }) {
  const [documents, setDocuments] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (user) {
      (async () => {
        const { documents } = await getDocuments();

        setDocuments(documents);
      })();
    }
  }, [user]);

  function handleGetToClickedDocument(id) {
    history.push(`/documents/${id}`);
  }

  return (
    <div className="home-container">
      {documents.map(document =>
        <div className="box" key={document._id} onClick={() => handleGetToClickedDocument(document._id)}>
          <div className="text-body">{document.body.ops[0].insert || ""}</div>
          <div className="date">{document.createdAt}</div>
        </div>)}
    </div>
  );
}

export default Home;
