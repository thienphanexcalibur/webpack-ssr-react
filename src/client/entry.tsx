import React, { useEffect, useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setInterval(() => setCount((prev) => prev + 1), 1000);
  }, []);
  return <div>counter {count}</div>;
}
