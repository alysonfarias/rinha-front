import React, { useState } from "react";
import Node from "./Node";

function JsonTree() {
  const [jsonData, setJsonData] = useState(null);
  const [expandAll, setExpandAll] = useState(false);
  const [jsonInput, setJsonInput] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        setJsonData(data);
      } catch (error) {
        // ... (error handling)
      }
    };
    reader.readAsText(file);
  };

  const handleTextInputChange = (event) => {
    setJsonInput(event.target.value);
    try {
      const data = JSON.parse(event.target.value);
      setJsonData(data);
    } catch (error) {
      // Handle invalid JSON input gracefully (e.g., display an error message)
    }
  };

  return (
    <div className="json-viewer-container">
      <div className="input-container">
        <input type="file" onChange={handleFileChange} />
        <textarea
          value={jsonInput}
          onChange={handleTextInputChange}
          placeholder="Enter JSON here"
          style={{ width: "100%", height: "200px", fontFamily: "monospace" }}
        />
        <button onClick={() => setExpandAll(true)}>Expand All</button>
      </div>
      <div className="json-tree-container">
        {jsonData && <Node data={jsonData} depth={0} expandAll={expandAll} />}
      </div>
    </div>
  );
}

export default JsonTree;
