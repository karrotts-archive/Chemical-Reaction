import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      Current Count: {count}
      <button onClick={() => setCount(count-1)}>-</button>
      <button onClick={() => setCount(count+1)}>+</button>
    </div>
  );
}
