import React, { FC } from "react";
import { Button } from "@libs/components";
import img from "./images.jpeg";

const App = () => {
  return (
    <div>
      <Button label="LAUNCH SLACK" />
      <img src={img} width="500" alt="" srcset="" />
    </div>
  );
};

export default App;
