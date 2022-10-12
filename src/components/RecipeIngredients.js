import React, { useEffect, useState } from 'react'

const RecipeIngrediens = ({ data }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const ingredients = Object.keys(data).filter((key) => key.startsWith('strIngredient')).filter((key) => data[key] !== null && data[key])
    const ingredientsWithMeasures = ingredients.map((item, index) => (
      {
        id: index + 1,
        ingredient: data[item],
        measure: data[`strMeasure${index + 1}`]
      }
    ));
    setItems(ingredientsWithMeasures);
  }, [data])
  
  return (
    <div className="recipe-card-ingredients">
      <p className='recipe-card-ingredients__title'>Ingredients</p>
      <ul className='recipe-card-ingredients__measures-list'>
        {
          items.map((item) => {
            return <li className='recipe-card-ingredients__measures-list__item' key={item.id}>
              <p>{item.ingredient}</p>
              <p>{item.measure}</p>
            </li>
          }
          )}
      </ul>
    </div>
  )
}

export default RecipeIngrediens;