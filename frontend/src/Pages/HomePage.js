import React, { useState } from 'react';
import Card from '../Components/Card.js';
import './HomePage.css';

function HomePage() {
  const dayMap = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const [carbonScores, setCarbonScores] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [currDay, setCurrDay] = useState(0);
  const [currMiles, setCurrMiles] = useState(100);
  const [currVehicle, setCurrVehicle] = useState('SmallDieselCar');
  const [totalCarbonScore, setTotalCarbonScore] = useState(0);

  const handleChange = (event) => {
    setCurrMiles(event.target.value);
  };

  const updateCarbonScore = () => {
    const updatedCarbonScores = [...carbonScores];
    const xhr = new XMLHttpRequest();
    const url = `https://carbonfootprint1.p.rapidapi.com/CarbonFootprintFromCarTravel?distance=${currMiles}&vehicle=${currVehicle}`;
    
    xhr.open('GET', url);
    xhr.setRequestHeader("X-RapidAPI-Key", "5d894876a2mshf6015305a4edd4bp1a67a0jsnf4ea105ad680");
    xhr.setRequestHeader("X-RapidAPI-Host", "carbonfootprint1.p.rapidapi.com");
    
    xhr.onload = function () {
      if (xhr.status === 200) {
        const temp = JSON.parse(xhr.responseText);
        updatedCarbonScores[currDay] = currMiles;
        setCarbonScores(updatedCarbonScores);
        setTotalCarbonScore(totalCarbonScore + temp.carbonEquivalent);
      }
    };
    
    xhr.send();
  };

  return (
    <div>
      <div className="homePage">
        <div className='appTitle'>
          <h1>Carbon Tracker <font color="2abe31">GPT</font></h1>
        </div>
        <div className="calendar">
          {dayMap.map((day, index) => (
            <Card key={index} day={day} carbonScore={carbonScores[index]} func={setCurrDay} curDay={index} />
          ))}
        </div>
        <h2 className="day">Enter Miles Driven on: {dayMap[currDay]}</h2>
        <div className="infoContainer">
          <div className="milesHandler">
          <input className='milesInput largeInput' type="number" value={currMiles} onChange={handleChange} />
            <h3 className="miles">Miles</h3>
          </div>
          <div className="carHandler">
            <h3>Your Car Is A: {currVehicle}</h3>
            <select className='vehicleSelect' name="cars" id="cars" value={currVehicle} onChange={(e) => setCurrVehicle(e.target.value)}>
              <option value="SmallPetrolCar">Small Gas Car</option>
              <option value="MediumPetrolCar">Medium Gas Car</option>
              <option value="LargePetrolCar">Large Gas Car</option>
              <option value="SmallDieselCar">Small Diesel Car</option>
              <option value="MediumDieselCar">Medium Diesel Car</option>
              <option value="LargeDieselCar">Large Diesel Car</option>
              <option value="MediumHybridCar">Medium Hybrid Car</option>
              <option value="LargeHybridCar">Large Hybrid Car</option>
              <option value="SmallPetrolVan">Small Gas Van</option>
              <option value="LargePetrolVan">Large Gas Van</option>
              <option value="SmallDielselVan">Small Dielsel Van</option>
              <option value="MediumDielselVan">Medium Dielsel Van</option>
              <option value="LargeDielselVan">Large Dielsel Van</option>
            </select>
          </div>
        </div>
          <button className="submit" onClick={updateCarbonScore}>Submit</button>
        <div className="carbonScoreContainer">
          <h3>Carbon Score: {totalCarbonScore}</h3>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
