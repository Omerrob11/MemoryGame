import "../styles/cards.css";
import { useState } from "react";

function RenderCards({ pokemonList, handleCardClick }) {
  return (
    <div className="cards-container">
      {pokemonList.length > 0 &&
        pokemonList.map((pokemon) => {
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
