import * as React from "react";
import { useContext } from "react";
import TerminalSimpleEditor from "../components/UI/terminalSimpleEditor";
import Testgraph from "../components/UI/testgraph";
import { AppDataContext } from "../components/context/AppDataContext";

const App = () => {
  const data = useContext(AppDataContext);
  return (
    <>
      <div class="min-w-screen min-h-[35vh] flex items-center justify-center">
        {data.simresult && <Testgraph />}
      </div>
      <div class="min-w-screen text-center items-center m-auto content-center border-2">
        <TerminalSimpleEditor />
      </div>
    </>
  );
};

export default App;
