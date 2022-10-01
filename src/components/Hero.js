import React from 'react'
import {Link} from 'react-router-dom';
import hero from '../images/hero.jpg'
import '../styles/Hero/Hero.css'

const Hero = () => {
  return (
    <section className='hero-section'>
        <div className="container">
            <div className="hero-section-container">
                <div className="hero-section-info">
                    <h1 className='hero-section-title'>Find The Perfect 
                    <span className='title-active'> Meal Recipe </span>For You </h1>
                    <p className='hero-section-text'>a listing website of meal recipe</p>
                    <div className="hero-section-buttons">
                        <Link className='hero-btn hero-btn-meals' to='/meals'>Explore Meals</Link>
                        <Link className='hero-btn hero-btn-saved-meals' to='/savedMeals'>Saved Meals</Link>
                    </div>
                </div>
                <img className="hero-section-img" src={hero} alt="Hero_image" />
            </div>
        </div>
    </section>
  )
}

export default Hero