import React, { useEffect } from 'react';
import './LandingPage.css'; // Import your CSS file here

function TypeEffect() {
  useEffect(() => {
    // JavaScript code here
    const dynamicText = document.querySelector("h1 span");
    const words = ["App", "Calculator", "GPT"];

    // Variables to track the position and deletion status of the word
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeEffect = () => {
      const currentWord = words[wordIndex];
      const currentChar = currentWord.substring(0, charIndex);
      dynamicText.textContent = currentChar;
      dynamicText.classList.add("stop-blinking");

      if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(typeEffect, 200);
      } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(typeEffect, 100);
      } else {
        isDeleting = !isDeleting;
        dynamicText.classList.remove("stop-blinking");
        wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex;
        setTimeout(typeEffect, 1200);
      }
    };

    typeEffect();
  }, []);

  return (
    <h1 className="h1-class">Carbon Tracker <span className="span-class"></span></h1>
  );
}

export default TypeEffect;
