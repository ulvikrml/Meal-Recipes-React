import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'

const SavedMeals = () => {
  const [list, setList] = useState([])
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('recipe'));
    if (data) { setList(data) }
  }, [])

  console.log(list.idMeal);
  console.log([list]);
  return (
    <div className="saved-meals">
    <div className="container">
      <h2 className='saved-list-title'>My Saved Meal List</h2>
      <div className='saved-list'>
        {list ? list.map(item => {
          return <Link key={item.idMeal} className='saved-list-item' to={`/meals/recipe/${item.idMeal}`}>
          <div>
            <h4 className='saved-list-item-title'>{item.strMeal}</h4> 
            <ul>
              <li>Category: {item.strCategory}</li>
              <li>Area: {item.strArea}</li>
            </ul>
          </div>
          </Link>
        }) : 'There is no saved recipe'}
      </div>
        </div>
    </div>
  )
}

export default SavedMeals