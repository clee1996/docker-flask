import React, { useState, useEffect } from 'react';

function Greeting() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <h1>WELCOME TO THE RECIPE BANK</h1>
    </div>
  );

}

export default Greeting;
