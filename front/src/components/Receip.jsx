import Button from './Button'

export default function Receip(props) {

    const handleGenerateList = () => {
        if (typeof props.onGenerateList === 'function') {
          props.onGenerateList(props.title); // Pass the recipe name to the parent component
        }
      };

    const onRecipeClick = () => {
      location.replace(`/recipes/${props.id}`);
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
        <Button text="Voir la recette" onClick={onRecipeClick}/>
    </div>
    )
  }