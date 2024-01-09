import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RecipesContext } from '../contexts/api/RecipesContext.jsx';
import { OpenAiContext } from  '../contexts/api/OpenAiContext.jsx';
import styles from '../styles/Recipe.module.scss';

function Recipe() {
    const { id } = useParams();

    const { recipe, getById } = useContext(RecipesContext);
    const [error, setError] = useState(null);
    const { similarRecipes, postSimilar } = useContext(OpenAiContext);

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
                    <div className={styles.bodyRecipe}>
                        <div className={styles.bodyRecipeIngredients}>
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
                    <div>
                        {similarRecipes && (
                            <div>
                            <h2>Recettes Similaires : </h2>
                            <ul className={styles.listSimilar}>
                                {similarRecipes && Object.keys(similarRecipes).length > 0 && (
                                    JSON.parse(similarRecipes).map((recipe, index) => (
                                        <li key={index}>{recipe}</li>
                                    ))
                                )}
                            </ul>
                            </div>
                        )}
                        <button onClick={() => postSimilar({ "recette": recipe.title })}>Trouver des recettes similaires</button>
                    </div>
                </div>
                
            )}
        </div>
    );
}

export default Recipe;
