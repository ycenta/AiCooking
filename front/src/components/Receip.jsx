import Button from './Button'

export default function Receip(props) {
    return (
    <div className="receip">
        <h3>{props.title}</h3>
        <p>{props.calories}</p>
        <ul>
            {props.ingredients.map((ingredient) => {
                return <li>{ingredient.text}</li>
            })}
        </ul>
        <Button text="Generer une liste de course" onClick={() => console.log("generation liste de course")}/>
    </div>
    )
  }