import React, {useState} from 'react'

const MealForm = (props) => {
  const [value, setValue] = useState('')
  return (
    <div>
        <form className='search-recipe-form' onSubmit={props.getRecipe}>
            <input value={value} onChange={e => setValue(e.target.value)} className='recipe-input' name='recipeName' type="text"/>
            <button disabled={!value} className="form-btn">Search</button>
        </form>
    </div>
  )
}

export default MealForm