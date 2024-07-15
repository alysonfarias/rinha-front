import React, { useState } from "react";

function Node({ data, depth = 0 }) {
  const [expanded, setExpanded] = useState(false);
  const isObject =
    typeof data === "object" && !Array.isArray(data) && data !== null;
  const isArray = Array.isArray(data);

  const toggleExpand = () => {
    if (isObject || isArray) {
      setExpanded(!expanded);
    }
  };

  return (
    <div style={{ marginLeft: `${depth * 20}px` }}>
      <span
        onClick={toggleExpand}
        style={{ cursor: isObject || isArray ? "pointer" : "default" }}
      >
        {isObject ? (expanded ? "▾ Object" : "▸ Object") : null}
        {isArray ? (expanded ? "▾ Array" : "▸ Array") : null}
        {!isObject && !isArray && JSON.stringify(data)}
      </span>
      {expanded && (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {isObject &&
            Object.keys(data).map((key) => (
              <li key={key}>
                <Node data={data[key]} depth={depth + 1} />
              </li>
            ))}
          {isArray &&
            data.map((item, index) => (
              <li key={index}>
                <Node data={item} depth={depth + 1} />
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

export default Node;
