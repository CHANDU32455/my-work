// App.js
import React, { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    // Disable right-click functionality
    const disableRightClick = (e) => {
      e.preventDefault();
      alert('Right-click is disabled on this page.');
    };

    // Disable copy functionality
    const disableCopy = (e) => {
      e.preventDefault();
      alert('Copy functionality is disabled on this page.');
    };

    // Detect tab switch and mouse movement to the top
    const handleMouseMove = (e) => {
      if (e.clientY < 10) {
        alert('Please do not leave the page!');
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        alert('You switched tabs. Closing the browser now.');
        window.close();
      }
    };

    // event listeners
    document.addEventListener('contextmenu', disableRightClick);
    document.addEventListener('copy', disableCopy);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // cleanup on component unmount
    return () => {
      document.removeEventListener('contextmenu', disableRightClick);
      document.removeEventListener('copy', disableCopy);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to Codegnan</h1>
      <ul>
        <li>Tab Monitoring:</li>
      </ul>
      <li>
        User should not open another tab when he is viewing our website, if he open another tab in browser then browser should close automatically.
      </li>
      <li> if he move mouse to top it should popup alert not to leave page …  </li>
      <li> Disable mouse right click fuctionality </li>
      <li>Disable copy functionality in the page       </li>
      <p>  These functionalities should build on Reactjs and it should be plagiarism-free.</p>
    </div>
  );
};

export default App;
