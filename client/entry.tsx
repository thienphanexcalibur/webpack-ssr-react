import React, { lazy, Suspense, useEffect, useState } from "react";
import "./index.css";
import Button from "./components/button";

const LazyContent = lazy(() => import("./components/content"));

export default function App() {
  const [count, setCount] = useState(0);
  const [tabIndex, setTabIndex] = useState(0);
  useEffect(() => {
    setInterval(() => setCount((prev) => prev + 1), 1000);
  }, []);
  return (
    <div>
      <div>counter {count}</div>
      <div>
        <div onClick={() => setTabIndex(0)}>Tab 1</div>
        <div onClick={() => setTabIndex(1)}>Tab 2 (lazy)</div>
      </div>
      {tabIndex === 0 && <Button />}
      {tabIndex === 1 && (
        <Suspense fallback="loading...">
          <LazyContent />
        </Suspense>
      )}
    </div>
  );
}
