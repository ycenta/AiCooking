import Button from './Button'

export default function Receip(props) {

    const handleGenerateList = () => {
        if (typeof props.onGenerateList === 'function') {
          props.onGenerateList(props.title); // Pass the recipe name to the parent component
        }
      };
    
    return (
    <div className="receip">
        <h3>{props.title}</h3>
        <p>{props.calories}</p>
        <ul>
            {props.ingredients?.map((ingredient,index) => {
                return <li key={index}>{ingredient.text}</li>
            })}
        </ul>
        <Button text="Generer une liste de course" onClick={handleGenerateList}/>
        <br/>
        <br/>
        <Button text="Proposer un accompagnement intelligent" onClick={() => console.log("proposer un accompagnement intelligent")}/>
    </div>
    )
  }