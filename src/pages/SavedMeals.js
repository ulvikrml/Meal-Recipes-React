import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/SavedMeals/SavedMeals.css'

const SavedMeals = () => {
  const [list, setList] = useState([])
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('recipe'));
    if (data) { setList(data) }
  }, []);
  
  return (
    <div className="saved-meals">
      <div className="container">
        <h2 className='saved-list-title'>My Saved Meal List</h2>
        <div className='saved-list'>
          {list.length > 0 ? list.map(item => {
            return <Link key={item.idMeal} className='saved-list-item' to={`/meals/recipe/${item.idMeal}`}>
              <div>
                <h4 className='saved-list-item-title'>{item.strMeal}</h4>
                <ul>
                  <li>Category: {item.strCategory}</li>
                  <li>Area: {item.strArea}</li>
                </ul>
              </div>
            </Link>
          }) : <p className='empty-list-text'>There is not any saved recipe</p>}
        </div>
      </div>
    </div>
  )
}

export default SavedMeals