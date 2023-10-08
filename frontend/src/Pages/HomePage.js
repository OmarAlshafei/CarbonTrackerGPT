import React, { useState, useEffect } from 'react';
import Card from '../Components/Card.js';
import './HomePage.css';
import axios from 'axios';

function HomePage() {
    const dayMap = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const [miles, setMiles] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [currDay, setCurrDay] = useState(0);
    const [currMiles, setCurrMiles] = useState([]);
    const [totalCarbonScore, setTotalCarbonScore] = useState(0);
    const [currMake, setCurrMake] = useState('');
    const [currModel, setCurrModel] = useState('');
    const [currUnit, setCurrUnit] = useState('mi');
    const baseURL = "https://jsonplaceholder.typicode.com/posts";
    const [responseGPT, setResponseGPT] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false); 
  
    
  const handleChange = (event) => {
    setCurrMiles(parseInt(event.target.value));
  };


  const setMilesForDay = () => {
    const updatedMiles = [...miles];
    updatedMiles[currDay] = currMiles;
    setMiles(updatedMiles);
    setCurrMiles(0);
  };

  async function carbonScore_callGPT(props) {
    console.log(currMake);
    console.log(currModel);
    console.log(miles);
    
    let totalMiles = 0;
    
    //Add all of the miles
    for(let i = 0; i < 7; i++){
     totalMiles += miles[i];
    }

    console.log(totalMiles);
    const response = await fetch('http://localhost:8000/api/CarbonEmissions',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              make: currMake,
              model: currModel,
              miles: totalMiles
            }),
    });

    console.log(response);
    
    setIsLoading(true);
      setButtonClicked(true); 
  
      const responseGPT = await fetch('http://localhost:8000/api/chatGPT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: "Based on my carbon score which is ${response} tell me whether that is high or low on average and tell me steps to improve",
        }),
      });
  
      const data = await responseGPT.json();
      console.log(data);
      setResponseGPT(data.message.content);
  
      setIsLoading(false);
    // const encodedParams = new URLSearchParams();
    // encodedParams.set('vehicle_make', currMake);
    // encodedParams.set('vehicle_model', currModel);
    // encodedParams.set('distance_value', totalMiles);
    // encodedParams.set('distance_unit', 'mi');
    
    // const options = {
    //   method: 'POST',
    //   url: 'https://carbonsutra1.p.rapidapi.com/vehicle_estimate_by_model',
    //   headers: {
    //     'content-type': 'application/x-www-form-urlencoded',
    //     'X-RapidAPI-Key': 'c8978ec990msh123912b707b02b7p159836jsn73eac02d58f3',
    //     'X-RapidAPI-Host': 'carbonsutra1.p.rapidapi.com'
    //   },
    //   data: encodedParams,
    // };
    
    // try {
    //   const response = await axios.request(options);
    //   console.log(response.data);
    // } catch (error) {
    //   console.error(error);
    // }
  }
  
  return (
    <div id = "HomePage">
      
      <div className='appTitle'>
          <h1 id="titleHome">Carbon Tracker <font color="2abe31">GPT</font></h1>
      </div>
        <div className="homePage">
        <div className="calendar">
          {dayMap.map((day, index) => (
            <Card key={index} day={day} miles={miles[index]} func={setCurrDay} curDay={index} />
          ))}
        </div>
        <h2 className="day">Enter Commute For: {dayMap[currDay]}</h2>
        <div className="infoContainer">
          <div className="milesHandler">
          <input className='milesInput' type="number" min="0" value={currMiles} placeholder="Miles" onChange={handleChange} />
            <button id="smButton" type="set" onClick={setMilesForDay}>Set Miles</button>
          </div>
          <div className="vehicleHandler">
            <h3>Enter Make and Model</h3>
            <input className='makeInput' type="text" value={currMake} placeholder="Make" onChange={(e) => setCurrMake(e.target.value)} />
            <input className='modelInput' type="text" value={currModel} placeholder="Model" onChange={(e) => setCurrModel(e.target.value)} />
          </div>
        </div>
        <button id="submitButton" className="submit" onClick={carbonScore_callGPT}>Submit</button>
        <div className="carbonScoreContainer">
          <h3>Carbon Score: {totalCarbonScore.toFixed(2)}</h3>
        </div>
      </div>
      <div id="borderGPT">
        <h1 id="chatGPTTitle">Based on your carbon score here's how GPT can help you.</h1>
        <div id="insideBorderGPT">
          
        <div id="ChatGPT">
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
        </div>
      </div>
    </div>
  );
}

export default HomePage;