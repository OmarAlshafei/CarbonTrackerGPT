
import './ChatGPT.css';
import React, { useState } from 'react';

function ChatGPT(props) {
  const [responseGPT, setResponseGPT] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false); 

  const promptGPT = async () => {
    setIsLoading(true);
    setButtonClicked(true); 

    const response = await fetch('http://localhost:8000/api/chatGPT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: props.prompt,
      }),
    });

    const data = await response.json();
    console.log(data);
    setResponseGPT(data.message.content);

    setIsLoading(false);
  };

  return (
    <div id="ChatGPT">
      {!buttonClicked && ( 
        <button id="gptButton" onClick={promptGPT}>
          Solutions
        </button>
      )}
      {isLoading ? (
        <h1 id="loadingGPT">Loading...</h1>
      ) : (
        responseGPT && (
          <div id="textboxGPT">
            <p id="responseGPT">{responseGPT}</p>
          </div>
        )
      )}
    </div>
  );
}

export default ChatGPT;
