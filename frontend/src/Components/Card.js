function Card(props) {
    return (
        <div className="card">
            <h2>{props.day}</h2>
            <p>{props.carbonScore}</p>
        </div>
    );
}

export default Card;
