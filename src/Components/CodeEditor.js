import React, { useState, useEffect, useRef } from "react";
import Prism from "prismjs";
// import "../styles/prism.css"

const CodeEditor = (props) => {
  const [content, setContent] = useState(props.content || "");
  const textareaRef = useRef(null);
  const preRef = useRef(null);

  const handleKeyDown = (e) => {
    let value = content,
      selStartPos = e.currentTarget.selectionStart;

    // handle 4-space indent on
    if (e.key === "Tab") {
      value =
        value.substring(0, selStartPos) +
        "    " +
        value.substring(selStartPos, value.length);
      e.currentTarget.selectionStart = selStartPos + 3;
      e.currentTarget.selectionEnd = selStartPos + 4;
      e.preventDefault();

      setContent(value);
    }
  };

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  useEffect(() => {
    Prism.highlightAll();
  }, [props.language, content]);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    const pre = preRef.current;
    if (textarea && pre) {
      textarea.style.height = "auto"; // Reset the height to auto to get the scroll height
      pre.style.height = "auto"; // Reset the height to auto to get the scroll height
      const height = `${textarea.scrollHeight}px`; // Set the height to scrollHeight
      textarea.style.height = height;
      pre.style.height = height;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [content]);

  const getLineNumbers = () => {
    const lines = (content || "").split("\n").length;
    return Array.from({ length: lines }, (_, i) => i + 1).join("\n");
  };

  return (
    <div className="code-edit-container">
      <div className="line-numbers">
        <pre>{getLineNumbers()}</pre>
      </div>
      <textarea
        ref={textareaRef}
        className="code-input"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        onInput={adjustHeight}
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
      />
      <pre ref={preRef} className="code-output">
        <code className={`language-${props.language}`}>{content}</code>
      </pre>
    </div>
  );
};

export default CodeEditor;
