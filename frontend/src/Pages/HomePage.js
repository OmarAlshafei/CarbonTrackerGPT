import { useState } from 'react'
// import './App.css'
//import Card from './components/Card.jsx'
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

  /*const updateCarbonScore = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.example.com/data');
    xhr.onload = function() {
      if (xhr.status === 200) {
        setData(JSON.parse(xhr.responseText));
      }
    };
    xhr.send();
    updatedCarbonScores = [...carbonScores]
    updatedCarbonScores[currDay] =  
    setCarbonScores(updateCarbonScores)
  }*/

  return (
    <div>
      <div className="calendar">
        {/* <Card day={dayMap[0]} carbonScore={carbonScores[0]}></Card> */}
        {/* <Card day={dayMap[1]} carbonScore={carbonScores[1]}></Card> */}
        {/* <Card day={dayMap[2]} carbonScore={carbonScores[2]}></Card> */}
        {/* <Card day={dayMap[3]} carbonScore={carbonScores[3]}></Card> */}
        {/* <Card day={dayMap[4]} carbonScore={carbonScores[4]}></Card> */}
        {/* <Card day={dayMap[5]} carbonScore={carbonScores[5]}></Card> */}
        {/* <Card day={dayMap[6]} carbonScore={carbonScores[6]}></Card> */}
      </div>
      <h2 className="day">Today is {currDay}</h2>
      <div className="milesContainer">
        <input onChange={handleChange}></input>
        <h3>Miles</h3>
        {/* <button className="milesSubmit" onClick={updateCarbonScore}></button> */}
      </div>
      <div className="carbonScoreContainer">
        <h3>Carbon Score: {carbonScores[currDay]}</h3>
        
      </div>
      
    </div>
  )
}

export default HomePage
