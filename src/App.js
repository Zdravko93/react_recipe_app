import React, { useState, useEffect } from 'react';
import './App.css';
import Recipe from './Recipe';

function App() {
 
  const APP_ID = '1dfdc318';
  const APP_KEY = 'b5bfd7fc0b0c0f2065fb60519b00befb';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  useEffect(() => {
     getRecipes();
  }, [query]); 

  const getRecipes = async () => {
     const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
     const data = await response.json();
     console.log(data.hits);
     setRecipes(data.hits);
  }

  const updateSearch = e => {
      setSearch(e.target.value);
     
  }
  
 const getSearch = e => {
    e.preventDefault(); 
     setQuery(search);
     setSearch('');
     
 }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input type="text" className="search-input" value={search} onChange={updateSearch}/>
        <button className="search-btn">Search</button>
      </form>
       <div className="recipes">
      {recipes.map(recipe => (
        <Recipe 
        key={recipe.recipe.label}
        title={recipe.recipe.label}
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
      ))};
      </div>
    </div>
  );
}

export default App;
