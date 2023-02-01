import { useState } from "react";
import { RecoilRoot } from "recoil";
import { RecoilApp } from "./recoil/RecoilApp";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>Recoil</h1>
      <RecoilRoot>
        <RecoilApp />
      </RecoilRoot>
    </div>
  );
}

export default App;
