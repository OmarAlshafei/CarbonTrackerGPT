import { useState, useEffect } from 'react'
import Card from '../Components/Card.js'
import './HomePage.css'
import { format } from 'react-string-format';
// const axios = require('axios');
// const app = express();
var totalCarbonScore = '';
//import suggestions from "./test.json"

function HomePage() {
  const dayMap = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  const [carbonScores, setCarbonScores] = useState([0,0,0,0,0,0,0])
  const [currDay, setcurrDay] = useState(0)
  const [currSuggestions, setCurSuggestions] = useState([])
  const [currMiles, setCurrMiles] = useState(100)
  const [currVehicle, setCurrVehicle] = useState('SmallDieselCar')
  const [totalCarbonScore, setTotalCarbonScore] = useState(0); // Add totalCarbonScore state

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
    xhr.setRequestHeader("X-RapidAPI-Key", "b4306ba6e6msh94925cf0c0d0330p1d7fa4jsn16de956e44ea"); 
    xhr.setRequestHeader("X-RapidAPI-Host", "carbonfootprint1.p.rapidapi.com");
    xhr.onload = function() {
      if (xhr.status === 200) {
        const temp = JSON.parse(xhr.responseText);
        // console.log(temp)
        updatedCarbonScores[currDay] = currMiles
        setCarbonScores(updatedCarbonScores);
        setTotalCarbonScore(totalCarbonScore + temp.carbonEquivalent);
      }
    };
    xhr.send();
  }
  
  return (
    <div className="homePage">
      <div class = 'appTitle'>
        <h1>Carbon Tracker <font color="2abe31">GPT</font></h1>
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
        <h3>Carbon Score: {totalCarbonScore}</h3>
        
      </div>
      
    </div>
  )
}

export default HomePage
