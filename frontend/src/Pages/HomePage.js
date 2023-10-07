import { useState } from 'react'
import Card from '../Components/Card.js'
import './HomePage.css'
import { format } from 'react-string-format';
// const axios = require('axios');
// const app = express();

//import suggestions from "./test.json"

function HomePage() {
  const dayMap = ["Mon", "Tues", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const [carbonScores, setCarbonScores] = useState([0,0,0,0,0,0,0])
  const [currDay, setcurrDay] = useState(0)
  const [currSuggestions, setCurSuggestions] = useState([])
  const [currMiles, setCurrMiles] = useState(100)
  const [currVehicle, setCurrVehicle] = useState('SmallDieselCar')
  // const titles = suggestions.map((suggestion) => suggestions.title);

  const handleChange = (event) => {
    setCurrMiles(event.target.value);
  }

  function updateCarbonScore () {
    const updatedCarbonScores = [...carbonScores]
    const xhr = new XMLHttpRequest();
    const url = `https://carbonfootprint1.p.rapidapi.com/CarbonFootprintFromCarTravel?distance=${currMiles}&vehicle=${currVehicle}`;
    console.log(url)
    xhr.open('GET', url);
    xhr.setRequestHeader("X-RapidAPI-Key", "c8978ec990msh123912b707b02b7p159836jsn73eac02d58f3"); 
    xhr.setRequestHeader("X-RapidAPI-Host", "carbonfootprint1.p.rapidapi.com");
    xhr.onload = function() {
      if (xhr.status === 200) {
        const temp = JSON.parse(xhr.responseText);
        // console.log(temp)
        updatedCarbonScores[currDay] = temp.carbonEquivalent
        setCarbonScores(updatedCarbonScores);
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
        <Card day={dayMap[0]} carbonScore={carbonScores[0]} func={setcurrDay} curDay={0}></Card>
        <Card day={dayMap[1]} carbonScore={carbonScores[1]} func={setcurrDay} curDay={1}></Card>
        <Card day={dayMap[2]} carbonScore={carbonScores[2]} func={setcurrDay} curDay={2}></Card>
        <Card day={dayMap[3]} carbonScore={carbonScores[3]} func={setcurrDay} curDay={3}></Card>
        <Card day={dayMap[4]} carbonScore={carbonScores[4]} func={setcurrDay} curDay={4}></Card>
        <Card day={dayMap[5]} carbonScore={carbonScores[5]} func={setcurrDay} curDay={5}></Card>
        <Card day={dayMap[6]} carbonScore={carbonScores[6]} func={setcurrDay} curDay={6}></Card>
      </div>
      <h2 className="day">Enter Miles Driven on: {dayMap[currDay]}</h2>
      <div className="milesContainer">
        <input onChange={handleChange}></input>
        <h3>Miles</h3>
        <button className="submit" onClick={updateCarbonScore}>Submit</button>
      </div>
      <div className="carbonScoreContainer">
        <h3>Carbon Score: {carbonScores[currDay]}</h3>
        
      </div>
      
    </div>
  )
}

export default HomePage