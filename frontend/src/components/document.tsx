import React, { useState, useEffect } from 'react';
import '../css/dashboard.css';
import { useParams, Navigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

type DefaultDocumentProps = {
  username?: string;
  onLogin?: (username: string) => void;
};

const Document: React.FC<DefaultDocumentProps> = () => {
  const { id } = useParams();  
  const [cookies] = useCookies(['username', 'password', 'email']); 
  const [docText, setDocText] = useState('');
  const [docName, setDocName] = useState('');
  const [falseDocument, setFalseDocument] = useState(false);

  useEffect(() => {
    const getDocument = async () => {
      try {
        console.log(cookies.email);
        const response = await fetch('http://localhost:5000/getdoc', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });
        const data = await response.json();
        if (data.message === "Document exists.") {
          console.log("Doc found");
          setDocText(data.document.doc_text);
          setDocName(data.document.doc_name);
        } else {
          console.log("error");
          setFalseDocument(true);
        }
      } catch (error) {
        console.error('Error sending data:', error);
      }
    };

    if (id) {
      getDocument();
    }
  }, [id]); // runs again only if id changes
  if (falseDocument) {
    return <Navigate to="/" replace />;
  }
  return (
    <div>
      <div id="dashboardheader">
        <span id="usernameheader">Welcome, {cookies.username}!</span>
        <span id="circleheader">A</span>
      </div>
      <div id="documentname">{docName}</div>
      <textarea
        value={docText}
        onChange={(e) => setDocText(e.target.value)}
        placeholder="Start writing..."
      />
    </div>
  );
};

export default Document;
