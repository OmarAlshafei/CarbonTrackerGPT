import { useState } from 'react'
import Card from '../Components/Card.js'
import './HomePage.css'
// const axios = require('axios');
// const app = express();

//import suggestions from "./test.json"

function HomePage() {
  const dayMap = ["Mon", "Tues", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const [carbonScores, setCarbonScores] = useState([0,0,0,0,0,0,0])
  const [currDay, setcurrDay] = useState(0)
  const [currSuggestions, setCurSuggestions] = useState([])
  const [currMiles, setCurrMiles] = useState(0)
  // const titles = suggestions.map((suggestion) => suggestions.title);

  const handleChange = (event) => {
    setCurrMiles(event.target.value);
  }

  function updateCarbonScore () {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://carbonfootprint1.p.rapidapi.com/CarbonFootprintFromCarTravel?distance=100&vehicle=SmallDieselCar');
    xhr.setRequestHeader("X-RapidAPI-Key", "c8978ec990msh123912b707b02b7p159836jsn73eac02d58f3"); 
    xhr.setRequestHeader("X-RapidAPI-Host", "carbonfootprint1.p.rapidapi.com");
    xhr.onload = function() {
      if (xhr.status === 200) {
        console.log(JSON.parse(xhr.responseText));
      }
    };
    xhr.send();
  }
  
  return (
    <div className="homePage">
      <div class = 'appTitle'>
        <h1>Carbon Tracker GPT</h1>
      </div>
      <div className="calendar">
        <Card day={dayMap[0]} carbonScore={carbonScores[0]}></Card>
        <Card day={dayMap[1]} carbonScore={carbonScores[1]}></Card>
        <Card day={dayMap[2]} carbonScore={carbonScores[2]}></Card>
        <Card day={dayMap[3]} carbonScore={carbonScores[3]}></Card>
        <Card day={dayMap[4]} carbonScore={carbonScores[4]}></Card>
        <Card day={dayMap[5]} carbonScore={carbonScores[5]}></Card>
        <Card day={dayMap[6]} carbonScore={carbonScores[6]}></Card>
      </div>
      <h2 className="day">Today is {currDay}</h2>
      <div className="milesContainer">
        <input onChange={handleChange}></input>
        <h3>Miles</h3>
        <button type="submit" onClick={updateCarbonScore}>Submit</button>
      </div>
      <div className="carbonScoreContainer">
        <h3>Carbon Score: {carbonScores[currDay]}</h3>
        
      </div>
      
    </div>
  )
}

export default HomePage
