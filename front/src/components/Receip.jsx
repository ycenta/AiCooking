export default function Receip(props) {
    return (
    <div className="receip">
        {/* <img src={props.image} alt={props.title} className="receipImage"/> */}
        <h3>{props.title}</h3>
        <p>{props.calories}</p>
        <ul>
           
        </ul>
    </div>
    )
  }