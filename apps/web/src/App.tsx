import React, { FC } from "react";
import { Button } from "@libs/components";

const img = require("./images.jpeg");

const App: FC = () => {
  return (
    <div>
      <Button label="LAUNCH SLACK" />
      <img src={img} width="500" alt="" />
    </div>
  );
};

export default App;
