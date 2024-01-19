// import logo from "./logo.svg";
// import "./App.css";
import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAllow, setNumAllow] = useState(false);
  const [character, setCharactor] = useState(false);

  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    // pg is the function to random generate some passwords
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"; // str me wo data aye ga jis sy me apna password generate kron ga
    if (numAllow) str += "0123456789";
    if (character) str += "!@#$%^&*()_+[]{}~'><";

    for (let i = 1; i <= length; i++) {
      //loop is liye hai k ye hamain str me sy koi si bhi random values nikal kar dy ga har bar
      let char = Math.floor(Math.random() * str.length + 1); //math.random hamain ik random value dy ga jo k math.floor kr dia..or hamain us nay array ki index value dy di.
      pass += str.charAt(char); // str me sy character ko uthany k liye
    }
    setPassword(pass);
  }, [length, numAllow, character, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllow, character, passwordGenerator]);

  const passwordRef = useRef(null);

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div
        className="
        w-full
        max-w-md
        mx-auto
        shadow-md
        rounded-lg
        text-3xl
        px-8
        py-4
        my-8
        text-orange-500
        bg-gray-700
        text-center
     "
      >
        <h1 className="text-2xl text-center text-white">Password Generator</h1>

        <div className="flex justify-center mt-5 text-sm rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyToClipboard}
            className="outline-none bg-green-700 text-white px-3 py-0.5 shrink-0"
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={5}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numAllow}
              id="numberInput"
              onChange={() => {
                setNumAllow((prev) => !prev); //prev value reversed
              }}
            />
            <label>Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={character}
              id="characterInput"
              onChange={() => {
                setCharactor((prev) => !prev);
              }}
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
