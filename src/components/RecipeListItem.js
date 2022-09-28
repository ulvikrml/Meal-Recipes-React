import React from 'react'
import {Link} from 'react-router-dom'

const MealListItem = ({data}) => {
  return (
    <div>
        {data.strMeal}
        <Link to={`/meals/recipe/${data.idMeal}`}>View Recips</Link>
        {/* {data.strCategory} */} 
        {/* state={{ recipe: recipe.strMeal }} */}
    </div>
  )
}

export default MealListItem