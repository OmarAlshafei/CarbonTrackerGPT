function Card(props) {
    function changeDay(){
        props.func(props.curDay)
    }

    return (
        <button className="card" onClick={changeDay}>
            <h2>{props.day}</h2>
            <p>{props.carbonScore}</p>
        </button>
    );
}

export default Card;
