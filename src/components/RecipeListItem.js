import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/RecipeListItem/RecipeListItem.css'

const MealListItem = ({ data }) => {
  console.log(data);
  return (
    <Link className='recipe-list-item' to={`/meals/recipe/${data.idMeal}`}>
      <div>
        <img className='recipe-image' src={data.strMealThumb} alt="recipeImage" />
        <h3 className='recipe-name'>
        {data.strMeal}
        </h3>
      </div>
    </Link>
  )
}

export default MealListItem