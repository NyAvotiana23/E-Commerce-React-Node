import { useState } from "react";

import { testBackend } from "../api/data-test.js";

function Home(props) {
  const [testResult, setTestResult] = useState(null);

  const handleTest = async () => {
    try {
      const data = await testBackend();
      setTestResult(data);
    } catch {
      setTestResult({ error: "Backend not reachable" });
    }
  };
  return (
    <>
      <div>
        <button className="counter" onClick={handleTest}>
          Test Backend
        </button>
        {testResult && (
          <pre
            style={{
              marginTop: "0.5rem",
              fontSize: "0.85rem",
              maxWidth: 320,
              wordBreak: "break-word",
            }}
          >
            {JSON.stringify(testResult, null, 2)}
          </pre>
        )}
        <h1>
          Kit'n Alika ! Votre site pour acheter des kits pour vos animaux !
        </h1>
      </div>
    </>
  );
}

export default Home;
