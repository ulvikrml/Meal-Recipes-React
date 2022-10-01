import React, { useState } from 'react'
import MealForm from '../components/MealForm';
import RecipeListItem from '../components/RecipeListItem';
import '../styles/Meals/Meals.css'


const Meals = () => {
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const getRecipe = async (e) => {
        setRecipes([]);
        setError(false);
        setIsLoading(true);
        e.preventDefault();
        const recipeName = e.target.elements.recipeName.value;
        console.log(recipeName);
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeName}`);
            // const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${recipeName}`);
            const data = await response.json();
            if (response.ok && data.meals !== null) {
                console.log(data);
                setRecipes(data.meals);
            }
            else {
                throw new Error('Invalid recipe name!');
            }
        }
        catch (err) {
            console.log(err.message);
            setError(err.message)
        }
        setIsLoading(false);
    }

    let content = <p className='recipe-list-text'>There is not any recipe yet...</p>;

    if (recipes.length > 0) {
        content = <div className="recipe-list">
            {recipes?.length > 0 ? recipes.map(recipe => {
                return <RecipeListItem key={recipe.idMeal} data={recipe}></RecipeListItem>
            }) : ''}
        </div>
    }
    if (error) {
        content = <p className='err-text'>{error}</p>;
    }
    if (isLoading) {
        content = <p className='recipe-list-text'>Loading...</p>;
    }

    return (
        <div className='meals-container'>
            <div className="container">
                <MealForm getRecipe={getRecipe}></MealForm>
                <div className="added-text">
                    {content}
                </div>
            </div>
        </div>
    )
}

export default Meals;