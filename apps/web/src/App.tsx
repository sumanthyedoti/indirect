import { FC, useState } from "react";
import { Button } from "@libs/components";

import img from "./image.png";
import logo from "./react-icon.svg";

const App: FC = () => {
  const [count, setCount] = useState<number>(0);
  return (
    <div>
      <h1>{process.env.NODE_ENV}</h1>
      <h1>My App</h1>
      <Button
        label={`clicks: ${count}`}
        onClick={() => setCount((count) => count + 1)}
      />
      <img src={img} width="500" alt="" />
      <img src={logo} width="500" alt="" />
    </div>
  );
};

export default App;
