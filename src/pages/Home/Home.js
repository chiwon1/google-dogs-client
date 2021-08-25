import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./styles.css";

import { getDocuments } from "../../api/firebaseAuth";

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

  function handleClick(id) {
    history.push(`/documents/${id}`);
  };

  return (
    <div className="home-container">
      {documents.map(document =>
        <div className="box" key={document._id} onClick={() => handleClick(document._id)}>
          <div className="text-body">{document.body.ops[0].insert || ""}</div>
          <div className="date">{document.createdAt}</div>
        </div>)}
    </div>
  );
}

export default Home;
