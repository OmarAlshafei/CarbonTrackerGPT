import React, { useState, useEffect, useRef } from 'react';
import Card from '../Components/Card.js';
import './HomePage.css';
import axios from 'axios';

const app_name = 'seashell-app-j4qex';

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
    const responseRef = useRef(null);
    const [carbonEmissions, setCarbonEmissions] = useState([]);
  
   
  function buildPath(route){
      
    return 'https://localhost8080' + route;

  }
  const handleChange = (event) => {
    setCurrMiles(parseInt(event.target.value));
  };


  const setMilesForDay = () => {
    const updatedMiles = [...miles];
    updatedMiles[currDay] = currMiles;
    setMiles(updatedMiles);
    setCurrMiles([]);
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
    console.log(buildPath('/api/CarbonEmissions'))
    console.log(totalMiles);
    const response = await fetch(buildPath('/api/CarbonEmissions'),{
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

    const datacarbon = await response.json()
    
    console.log(datacarbon.data.data.co2e_kg);
    setCarbonEmissions(datacarbon.data.data.co2e_kg);

    

    document.getElementById("emissionDesc").innerText = "Your carbon emissions from the past week are " + datacarbon.data.data.co2e_kg.toFixed(2) + " CO2E kg. Your carbon emissions in a year will be " + (datacarbon.data.data.co2e_kg * 52).toFixed(2) + " CO2E kg. This is equivalent to " + ((datacarbon.data.data.co2e_kg * 52) / 1900).toFixed(2) + " cars in mass. This also does not factor the amount of carbon emissions from your consumption of food, electricity, or goods and services. The average person from the United States emits 16 metric tons of carbon emissions per year.";
    document.getElementById("emissionAmount").innerText = datacarbon.data.data.co2e_kg + " CO2E kg";

    if (responseRef.current) {
      responseRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    setIsLoading(true);
      setButtonClicked(true); 
  
      const responseGPT = await fetch(buildPath('/api/chatGPT'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `Based on my carbon emissions from driving a ${currMake} ${currModel} from the past week which is ${datacarbon.data.data.co2e_kg} co2e kg tell me whether that is high or low on average based on the average weekly emission being around 95.75 co2e kg and also whether or not i have a carbon emission friendly car and tell me steps to improve in 100 words`,
        }),
      });
  
      const data = await responseGPT.json();
      console.log(data);

      setResponseGPT(data.message.content);
      setIsLoading(false);
  }
  
  return (
    <div id = "HomePage">
      
      <div className='appTitle'>
          <h1 id="titleHome">Carbon Tracker <font color="2abe31">GPT</font></h1>
      </div>
        <div className="homePage">
          <div>
            <p id="paragraph">Learn about your carbon footprint by entering details about your weekly commute. Click on each day of the week to record your daily mileage and specify your vehicle's make and model.</p>
          </div>
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
        </div>
      </div>
      <div ref={responseRef}>
      </div>
      <h1 id= "emissionAmount"></h1>
      <p id="emissionDesc"></p>
      <div id="borderGPT">
        <div>
          <h1 id="chatGPTTitle">Based on your carbon score here's how GPT can help you.</h1>
        </div>
        <div id="insideBorderGPT">
        
        <div id="ChatGPT">
        {isLoading ? (
          <><div class="lds-ring"><div></div><div></div><div></div><div></div></div></>
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
