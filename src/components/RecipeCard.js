import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RecipeCard = () => {
  const [recipe, setRecipe] = useState([]);
  const [error, setError] = useState([]);

  const id = useParams();
  useEffect(() => {
    setRecipe([]);
    setError(false)
    const getRecipe = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id.id}`);
        const data = await response.json();
        if (response.ok && data.meals !== null) {
          setRecipe(data.meals[0]);
        }
        else {
          throw new Error('Something went wrong!');
        }
      }
      catch (err) {
        setError(err.message)
      }
    }
    getRecipe();
  }, [id]);
  const addToSave = () =>{
    localStorage.setItem('recipe', JSON.stringify({...recipe}));
  }
  console.log(recipe);
  return (
    <div className="container">
      <div className='recipe-card'>
        <p>{recipe?.strMeal}</p>
        <p> {recipe?.strCategory}</p>
        <p>{recipe?.strArea}</p>
        <p>{error ? error : ''}</p>
        <button onClick={addToSave} style={{width: '100px'}}>Save to List</button>
      </div>
    </div>
  )
}

export default RecipeCard