import React, { FC } from "react";
import { Button } from "@libs/components";

import img from "./image.png";
import logo from "./react-icon.svg";

const App: FC = () => {
  return (
    <div>
      <Button label="LAUNCH SLACK" />
      <img src={img} width="500" alt="" />
      <img src={logo} width="500" alt="" />
    </div>
  );
};

export default App;
