import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RecipesContext } from '../contexts/api/RecipesContext.jsx';
import { OpenAiContext } from  '../contexts/api/OpenAiContext.jsx';

function Recipe() {
    const { id } = useParams();

    const { recipe, getById } = useContext(RecipesContext);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                getById(id);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchRecipe();
    }, [id]);

    return (
        <div>
            {error && <p>Error: {error}</p>}
            {recipe && (
                <div>
                    <h1>{recipe.title}</h1>
                    <div>{recipe.description}</div>
                    <div>
                        <h2>Ingredients</h2>
                        <ul>
                            {Object.entries(JSON.parse(recipe.ingredients)).map(([key, value]) => (
                                <li key={key}>{value} {key}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2>Etapes : </h2>
                        <ul>
                            {Object.entries(JSON.parse(recipe.steps)).map(([key, value]) => (
                                <li key={key}>{parseInt(key)+1}) &nbsp; {value}</li>
                            ))}
                        </ul>
                    </div>

                </div>
            )}
        </div>
    );
}

export default Recipe;
