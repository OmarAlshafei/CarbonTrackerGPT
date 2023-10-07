import React, { useState, useEffect } from 'react';
import Card from '../Components/Card.js';
import './HomePage.css';
import ChatGPT from '../Components/ChatGPT.js';
import * as d3 from "d3";
import axios from 'axios';

function HomePage() {
    const dayMap = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const [carbonScores, setCarbonScores] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [miles, setMiles] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [currDay, setCurrDay] = useState(0);
    const [currMiles, setCurrMiles] = useState(0);
    const [currVehicle, setCurrVehicle] = useState('SmallPetrolCar');
    const [totalCarbonScore, setTotalCarbonScore] = useState(0);
    const [currMake, setCurrMake] = useState('Ford');
    const [currModel, setCurrModel] = useState('Focus');
    const [currUnit, setCurrUnit] = useState('mi');
    const handleChange = (event) => {
    setCurrMiles(event.target.value);
  };

  const setMilesForDay = () => {
    const updatedMiles = [...miles];
    updatedMiles[currDay] = currMiles;
    setMiles(updatedMiles);
    setCurrMiles(0);
  };
  
  const updateCarbonScore = () => {
    const updatedCarbonScores = [...carbonScores];
    const totalMiles = d3.sum(miles);
    
// api shit here
    
    updatedCarbonScores[currDay] = totalMiles;
    setCarbonScores(updatedCarbonScores);
    
    setTotalCarbonScore(3);
    // xhr.send();
  };
  
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
          <input className='milesInput' type="number" value={currMiles} onChange={handleChange} />
            <select className='unitSelect' value={currUnit} onChange={(e) => setCurrUnit(e.target.value)}>
              <option value="mi">mi</option>
              <option value="km">km</option>
            </select>
            <button type="set" onClick={setMilesForDay}>Set Miles</button>
          </div>
          <div className="vehicleHandler">
            <h3>Enter Make and Model</h3>
            <input className='makeInput' type="text" value={currMake} placeholder="Make" />
            <input className='modelInput' type="text" value={currModel} placeholder="Model" />
          </div>
        </div>
        <button id="submitButton" className="submit" onClick={updateCarbonScore}>Submit</button>
        <div className="carbonScoreContainer">
          <h3>Carbon Score: {totalCarbonScore.toFixed(2)}</h3>
        </div>
      </div>
    </div>
  );
}

export default HomePage;