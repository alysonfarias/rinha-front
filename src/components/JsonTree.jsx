import React, { useState } from "react";
import Node from "./Node";

function JsonTree() {
  const [jsonData, setJsonData] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        setJsonData(JSON.parse(e.target.result));
      } catch (error) {
        console.error("Erro ao analisar JSON:", error);
        // Tratar erro de forma amigável para o usuário
      }
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {jsonData && <Node data={jsonData} />}
    </div>
  );
}

export default JsonTree;
