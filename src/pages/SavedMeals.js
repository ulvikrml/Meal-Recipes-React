import React, { useState, useEffect } from 'react'

const SavedMeals = () => {
  const [list, setList] = useState([])
  useEffect(() => {
    const getSavedList = () => {
      const data = JSON.parse(localStorage.getItem('recipe'));
      if (data) { setList(data) }
    }
    getSavedList();
  }, [])

  console.log(list.idMeal);
  console.log([list]);
  return (
    <div>
      {list ? [list].map(item => {
        return <div key={item.idMeal}>
          {item.strMeal}
        </div>
      }) : 'There is no saved recipe'}
    </div>
  )
}

export default SavedMeals