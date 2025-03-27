import './style.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [pokemon, setPokemon] = useState({});
  const [search, setSearch] = useState('');

  function loadAPI(pokemonName = 'ditto') {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Pokémon não encontrado');
        }
        return response.json();
      })
      .then(res => {
        console.log(res);
        setPokemon(res);
      })
      .catch(err => {
        console.error(err);
        alert('Pokémon não encontrado!');
      });
  }

  useEffect(() => {
    loadAPI();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (search.trim() !== '') {
      loadAPI(search);
    }
  }

  return (
    <div className='container'>
      <header>
        <strong>Pokemon API</strong>
      </header>

      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Digite o nome do Pokémon'
        />
        <button type='submit'>Buscar</button>
      </form>

      {pokemon.sprites && (
        <div id="dados">
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <div>Name: {pokemon.name}</div>
          <div>Nº: {pokemon.id}</div>
          <div>Peso: {pokemon.weight / 10}kg</div>
          <div>Altura: {pokemon.height / 10}m</div>
          
        </div>
      )}
    </div>
  );
}

export default App;