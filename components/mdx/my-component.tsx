"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";

const MyComponent = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    // alert(`Button clicked ${count + 1} times!`);
  };

  return (
    <div>
      <Button onClick={handleClick}>Click me!</Button>
      <p>You have clicked the button {count} times.</p>
    </div>
  );
};

export default MyComponent;
