
// Launch in full-screen mode
const enterFullScreen = () => {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { // Firefox
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, and Opera
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
        document.documentElement.msRequestFullscreen();
    }
};

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

// Current tab state should not be hidden.
const handleVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
        alert('You switched tabs. Closing the browser now.');
        window.close();
    }
};

// Detect Alt + Tab or Shift + Alt + Tab keypress combinations
const handleKeydown = (e) => {
    if ((e.altKey && e.key === 'Tab') || (e.shiftKey && e.altKey && e.key === 'Tab')) {
        alert('Alt + Tab or Shift + Alt + Tab is not allowed. Closing the browser now.');
        window.close();
    }
};

// Detect window resize (maximize or minimize)
const handleResize = () => {
    if (window.outerWidth !== window.screen.width || window.outerHeight !== window.screen.height) {
        alert('Maximizing or minimizing is not allowed. Closing the browser now.');
        window.close();
    }
};

// Add event listeners
enterFullScreen();
document.addEventListener('contextmenu', disableRightClick);
document.addEventListener('copy', disableCopy);
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('visibilitychange', handleVisibilityChange);
window.addEventListener('keydown', handleKeydown);
window.addEventListener('resize', handleResize);

// Cleanup event listeners on component unmount
document.removeEventListener('contextmenu', disableRightClick);
document.removeEventListener('copy', disableCopy);
document.removeEventListener('mousemove', handleMouseMove);
document.removeEventListener('visibilitychange', handleVisibilityChange);
window.removeEventListener('keydown', handleKeydown);
window.removeEventListener('resize', handleResize);



<div style={{ padding: '20px' }}>
    <h1>Welcome to Codegnan</h1>
    <ul>
        <li>Tab Monitoring:</li>
    </ul>
    <li>
        User should not open another tab when he is viewing our website,
        if he move mouse to top it should popup alert not to leave page …
    </li>
    <li> if he open another tab in browser then browser should close automatically. </li>
    <li> Disable mouse right click fuctionality </li>
    <li>Disable copy functionality in the page       </li>
    <p>  These functionalities should build on Reactjs and it should be plagiarism-free and able to explain step-by-step code. </p>
</div>

