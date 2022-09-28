import React from 'react'

const MealForm = (props) => {
  return (
    <div>
        <form onSubmit={props.getRecipe}>
            <input className='recipe-input' name='recipeName' type="text"/>
            <button className="form-btn">Search</button>
        </form>
    </div>
  )
}

export default MealForm