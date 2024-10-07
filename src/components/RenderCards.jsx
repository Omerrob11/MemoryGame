import "../styles/cards.css";
import { useState } from "react";
const numOfRenderedPokemon = 9;

function RenderCards({ pokemonList, handleCardClick }) {
  // console.log(pokemonList);
  const renderedPokemonList = getRandomItems(pokemonList, numOfRenderedPokemon);

  return (
    <div className="cards-container">
      {renderedPokemonList.length > 0 &&
        renderedPokemonList.map((pokemon) => {
          return (
            <div
              className="card-single"
              key={pokemon.name}
              onClick={(e) => {
                handleCardClick(pokemon.name);
              }}
            >
              <h2>{pokemon.name}</h2>
              <img src={pokemon.imageUrl} alt={pokemon.name + " img"} />
            </div>
          );
        })}
    </div>
  );
}

export default RenderCards;

// shuffle the array using known algorithm run in O(n)
function getRandomItems(array, count) {
  const shuffled = structuredClone(array);

  for (let i = shuffled.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    const temp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = temp;
  }

  return shuffled.slice(0, count);
}
