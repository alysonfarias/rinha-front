import React, { useState } from "react";

function Node({ data, depth = 0 }) {
  const [expanded, setExpanded] = useState(false); // All nodes start collapsed
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
      {isObject && (
        <span onClick={toggleExpand} style={{ cursor: "pointer" }}>
          {expanded ? "▾ " : "▸ "}
          Object
        </span>
      )}
      {isArray && (
        <span onClick={toggleExpand} style={{ cursor: "pointer" }}>
          {expanded ? "▾ " : "▸ "}
          Array
        </span>
      )}
      {!isObject && !isArray && (
        <span>
          {typeof data === "string" ? `"${data}"` : data} {/* Quote strings */}
        </span>
      )}

      {expanded && (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {isObject &&
            Object.keys(data).map((key) => (
              <li key={key}>
                <span>{key}: </span>
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
