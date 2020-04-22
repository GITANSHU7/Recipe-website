import React, { useEffect, useState } from 'react';
import './App.css';
import Recipe from './Recipe';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const APP_ID = '3f7c48f8';
  const APP_KEY = 'e8f5646c5f94e103fc7fe81ce4b5695c';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  };
  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };

  return (
    <div className='App' style={{ minHeight: '100vh' }}>
      <div
        style={{
          height: 60,
          borderBottomWidth: 1,
          backgroundColor: '#ff5151',
          display: 'flex',
          alignItems: 'center',
          paddingRight: '10vw',
          paddingLeft: '10vw'
        }}
      >
        <FontAwesomeIcon
          icon={faUtensils}
          style={{ fontSize: 30, color: '#fff' }}
        />
        <h2
          style={{
            color: 'yellow',
            margin: 10,
            fontSize: 20,
            fontWeight: '700',
            letterSpacing: 1
          }}
        >
          FOODIEE
        </h2>
      </div>
      <form onSubmit={getSearch} className='search-form'>
        <input
          className='search-bar'
          type='text'
          value={search}
          onChange={updateSearch}
        />
        <button className='search-button' type='submit'>
          search
        </button>
      </form>
      <div className='recipes'>
        {recipes.map(recipe => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
