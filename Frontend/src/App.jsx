import React, { useEffect, useState } from "react";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-jsx";
import "@fontsource/fira-code";
import axios from "axios";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function App() {
  let [code, setCode] = useState(`function sum() {\n  return a + b;\n}`);
  let [review, setReview] = useState(``);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  const reviewCode = async () => {
    const response = await axios.post("http://localhost:8080/ai/get-review", {
      code,
    });
    setReview(response.data);
    // console.log(review);
  };
  return (
    <>
      <main className="h-screen w-full flex items-center justify-center gap-4 p-5 bg-zinc-950">
        <div className="left h-full overflow-hidden w-1/2 bg-zinc-900/90 relative rounded-xl">
          <div className="code h-full w-full p-2">
            <Editor
              className="editorw-full h-full font-fira-code text-[16px] text-zinc-300 border border-zinc-800 rounded-md focus:outline-none focus:border-transparent"
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={20}
            ></Editor>
          </div>
          <div
            onClick={reviewCode}
            className="review absolute bottom-4 right-4 text-sm bg-green-400/70 select-none text-zinc-900 px-4 py-[5px] rounded-md cursor-pointer font-semibold text-center"
          >
            Run code
          </div>
        </div>
        <div className="right h-full  w-1/2 bg-[#353535] border border-zinc-600 rounded-xl p-4 text-white">
          <div className="w-full h-full overflow-auto rounded-xl border border-zinc-600 px-4 py-3 ">
            <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
