import { RecoilRoot } from "recoil";
import { RecoilApp } from "./recoil/RecoilApp";
import { RxJsApp } from "./rxjs/RxJsApp";

function App() {
  return (
    <div className="App">
      <h1>Recoil</h1>
      <RecoilRoot>
        <RecoilApp />
      </RecoilRoot>
      <h1>RxJS</h1>
      <RxJsApp />
    </div>
  );
}

export default App;
