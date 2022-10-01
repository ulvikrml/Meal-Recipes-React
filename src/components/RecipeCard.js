import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaHeart, FaHeartBroken } from "react-icons/fa";

const RecipeCard = () => {
  const [recipe, setRecipe] = useState([]);
  const [error, setError] = useState([]);
  const [savedList, setSavedList] = useState();
  const [isInSavedList, setIsInSavedList] = useState(false);
  
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
          const isActive = list.find(item=>item.idMeal === data.meals[0].idMeal)
          setIsInSavedList(isActive);
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
    const list = JSON.parse(localStorage.getItem('recipe'));
    setSavedList(list);
  }, [id]); 
  

  const addToSave = () => {
    let updatedSavedList = savedList
    if (updatedSavedList == null) {
      localStorage.setItem('recipe', JSON.stringify([recipe]))
    }
    else { 
      if(updatedSavedList.find(item=>item.idMeal === recipe.idMeal)){
        setIsInSavedList(false);
        updatedSavedList = updatedSavedList.filter(e=> e.idMeal !== recipe.idMeal)
        console.log('del-item');
      }
      else{
        setIsInSavedList(true);
        updatedSavedList = [...savedList, recipe];
        console.log('add-item');
      }
    }
    localStorage.setItem('recipe', JSON.stringify(updatedSavedList));
    setSavedList(updatedSavedList);
  }
  console.log(savedList);

  const ingredients = Object.keys(recipe).filter((key) => key.startsWith('strIngredient')).filter((key) => recipe[key] !== null && recipe[key])

  const ingredientsWithMeasures = ingredients.map((item, index) => (
    {
      id: index + 1,
      ingredient: recipe[item],
      measure: recipe[`strMeasure${index + 1}`]
    }
  ));

  const instruction = `${recipe.strInstructions}`;
  const instructionArr = instruction.split('.');


  const { strMealThumb, strMeal, strArea, strCategory, strTags } = recipe
  return (
    <div className="container">
      <div className='recipe-card'>
        {recipe.length !== 0 ? <div>
          <img className='recipe-image' src={strMealThumb} alt="mealImage" />
          <p className='recipe-name'>{strMeal}</p>
          <ul>
            <li>Category: {strCategory}</li>
            <li>Area: {strArea}</li>
            {strTags ? <li>tags: {strTags}</li> : ``}
          </ul>
          <button onClick={addToSave} className='save-btn'>{isInSavedList ? <FaHeartBroken/> : <FaHeart/>} <span>save</span></button>

          {
            ingredientsWithMeasures.map((item) => {
              return <div className='ingredients-measures' key={item.id}>
                <p>{item.ingredient}</p>
                <p>{item.measure}</p>
              </div>
            }
            )}

          <p>Instructions</p>
          <ul>
            {instructionArr.map((item, index) => {
              return <li key={index}>{item}</li>
            })}
          </ul>
        </div>
          : ''}
        <p>{error ? error : ''}</p>
      </div>
    </div>
  )
}

export default RecipeCard