import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getRecipes } from "../api/recipeApi";
import "../styles/Home.css";
import Madina from "../../assets/member1.png";
import Aysu from "../../assets/member2.png";

const Home = () => {
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchFeaturedRecipes = async () => {
      try {
        const { recipes } = await getRecipes(1, 3);
        const lastThreeRecipes = recipes.slice(-3).reverse();
        setFeaturedRecipes(lastThreeRecipes);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      }
    };

    fetchFeaturedRecipes();
  }, []);

  return (
    <div className="home-container">
   
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Recipe Manager</h1>
          <p className="hero-description">
            Discover, create, and organize your favorite recipes with ease.
          </p>
          <button className="hero-button" onClick={() => navigate("/recipes")}>
            Get Started
          </button>
        </div>
        <img
          src="https://www.samtell.com/hs-fs/hubfs/Blogs/Four-Scrumptous-Tacos-Lined-up-with-ingredients-around-them-1.jpg?width=1800&name=Four-Scrumptous-Tacos-Lined-up-with-ingredients-around-them-1.jpg"
          alt="Delicious Food"
          className="hero-image"
        />
      </section>

      <section className="featured-recipes">
        <h2 className="section-title">Newest Recipes</h2>
        <div className="recipes-grid">
          {featuredRecipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <img
                src={recipe.bannerImage}
                alt={recipe.title}
                className="recipe-image"
              />
              <h3 className="recipe-title">{recipe.title}</h3>
              <p className="recipe-description">{recipe.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="our-team">
        <h2 className="section-title">Our Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <img src={Madina} alt="Team Member" className="team-image" />
            <h3 className="team-name">Madina Alili</h3>
            <p className="team-role">Student</p>
            <a className="profile-link"href="https://github.com/MadinaAlili">MadinaAlili</a>
          </div>
          <div className="team-member">
            <img src={Aysu} alt="Team Member" className="team-image" />
            <h3 className="team-name">Aysu Rahimli</h3>
            <p className="team-role">Student</p>
            <a className="profile-link" href="https://github.com/aysurahimli">aysurahimli</a>
          </div>
        </div>
      </section>

      <section className="our-projects">
        <h2 className="section-title">Our Projects</h2>
        <div className="projects-list">
          <div className="project-item">
            <h3 className="project-title">Auto Form Filler</h3>
            <p className="project-description">Our first project as a team in Web & Mobile 1 course. A Chrome extension that acts as an intelligent auto form filler for job applications and other forms.</p>
            <a href="https://github.com/aysurahimli/web-mobile-project1-team11" className="project-link">Chrome Extension Project Link</a>
          </div>
          <div className="project-item">
            <h3 className="project-title">Recipe Manager App</h3>
            <p className="project-description">Our second project as a team in Web & Mobile 1 course. A Recipe Manager App using React. The app allows users to create, view, edit, delete, and organize recipes.</p>
            <a href="https://github.com/MadinaAlili/WebMobile1Project2" className="project-link">Recipe App Project Link</a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;