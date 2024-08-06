import React from "react";
import { useState } from "react";
import "./styles.css";
import CodeEditor from "./Components/CodeEditor";

export default function App() {
  const [editorLanguage, setEditorLanguage] = useState("javascript");

  return (
    <div className="App">
      <div className="heading">
        <h1>Code Editor</h1>
        <p>A Simple Code Editor for JavaScript and CSS</p>
        <fieldset>
          <legend>Choose language:</legend>
          <input
            type="radio"
            id="javascript"
            name="language"
            value="javascript"
            checked={editorLanguage === "javascript"}
            onChange={() => setEditorLanguage("javascript")}
          />
          <label htmlFor="javascript">JavaScript</label>
          <input
            type="radio"
            id="css"
            name="language"
            value="css"
            checked={editorLanguage === "css"}
            onChange={() => setEditorLanguage("css")}
          />
          <label htmlFor="css">CSS</label>
        </fieldset>
      </div>

      <div className="container-editor">
        <CodeEditor language={editorLanguage} />
      </div>
    </div>
  );
}
