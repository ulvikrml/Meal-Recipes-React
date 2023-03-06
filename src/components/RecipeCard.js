import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaHeart, FaHeartBroken, FaBackward } from "react-icons/fa";
import '../styles/RecipeCard/RecipeCard.css'
import RecipeIngrediens from './RecipeIngredients';

const RecipeCard = () => {
  const [error, setError] = useState([]);
  const [recipe, setRecipe] = useState([]);
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
          const isActive = list.find(item => item.idMeal === data.meals[0].idMeal)
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
      console.log(recipe);
      updatedSavedList = [recipe];
    }
    else {
      if (updatedSavedList.find(item => item.idMeal === recipe.idMeal)) {
        setIsInSavedList(false);
        updatedSavedList = updatedSavedList.filter(e => e.idMeal !== recipe.idMeal)
        console.log('del-item'); 
      }
      else {
        setIsInSavedList(true);
        console.log(savedList);
        updatedSavedList = [...savedList, recipe];
        console.log('add-item');
      }
    }
    localStorage.setItem('recipe', JSON.stringify(updatedSavedList));
    setSavedList(updatedSavedList);
  }

  const instruction = `${recipe.strInstructions}`;
  const instructionArr = instruction.split('.');

  const { strMealThumb, strMeal, strArea, strCategory, strTags } = recipe;
  return (
    <div className='recipe-card'>
      <div className="container">
        {recipe.length !== 0 ? <div>
          <div className="recipe-card-header">
            <img className='recipe-image' src={strMealThumb} alt="mealImage" />
            <div className="recipe-card-header-text">
              <p className='recipe-name'>{strMeal}</p>
              <ul className='recipe-card-header-text__list'>
                <li className='recipe-card-header-text__list__item'>Category: {strCategory}</li>
                <li className='recipe-card-header-text__list__item'>Area: {strArea}</li>
                {strTags ? <li className='recipe-card-header-text__list__item'>tags: {strTags}</li> : ``}
              </ul>
              <button onClick={addToSave} className='recipe-card-header__save-btn'>{isInSavedList ? <FaHeartBroken /> : <FaHeart />} <span>{isInSavedList ? 'remove' : 'save'} </span></button>
            </div>
          </div>
          <RecipeIngrediens data={recipe}></RecipeIngrediens>
          <div className="recipe-card-instructions">
            <p className='recipe-card-instructions__title'>Instructions</p>
            <ul className='recipe-card-instructions__list'>
              {instructionArr.map((item, index) => {
                return <li className='recipe-card-instructions__list__item' key={index}>{item}</li>
              })}
            </ul>
          </div>
        </div>
          : ''}
        {error ? <div className='recipe-card-error-text-container'>
          <p className='error-text'>{error}</p>
          <Link className='go-back-link' to='/meals'><span>Go Back</span>  <FaBackward /></Link>
        </div> : ''}
      </div>
    </div>
  )
}

export default RecipeCard