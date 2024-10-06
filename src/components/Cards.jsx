import { useState, useEffect } from "react";

function Cards() {
  const [pokemonList, setPokemonList] = useState([]);

  // how we are going to do it?
  // get the list of pokemons names.
  // now we map the list using map
  // meaning, we have each time a pokemon name
  // then, we will return each time an object, of the:
  // pokemon name and url
  // then we will have an array of objects of pokemon names and urls of images
  // then, map that array, creating a pokemon card - name and image
  // then, each time, we update the state of the list of pokemons
  // to re-render it on page
  // the question is -why do that in useEffect?
  // because, we are sync to a different system
  // we want it to happen after/ on render
  // or in terms of effect - a start/stop cycle
  //we stop when we end the game, creating different pokemons.

  //   Meaning

  useEffect(() => {
    async function lol() {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=15"
        );
        const data = await response.json();
        console.log(data);
        const listOfPokemons = data.results;
        const pokemonsNameAndImageList = listOfPokemons.map(async (pokemon) => {
          const response = await fetch(`${pokemon.url}`);
          const data = await response.json();
          const pokemonObj = {
            name: pokemon.name,
            imageUrl: data.sprites.front_default,
          };
          return pokemonObj;
        });

        const upadtedPokemonList = await Promise.all(pokemonsNameAndImageList);
        setPokemonList(upadtedPokemonList);
        console.log(upadtedPokemonList);
      } catch (error) {
        console.log("error fetching pokemon data");
        // here - we will make default data
      }
    }

    lol();
    // we are going to use async function
  }, []);
  // build a state of cards.
  // show them on screen.
  // then - have an api call to get the cards
  // I want to sync with the external system - API of giphy
  return (
    <div className="cards-container">
      {pokemonList.length > 0 &&
        pokemonList.map((pokemon) => {
          return (
            <div className="card-single" key={pokemon.name}>
              <h2>{pokemon.name}</h2>
              <img src={pokemon.imageUrl} alt={pokemon.name + " img"} />
            </div>
          );
        })}
    </div>
  );
}

export default Cards;
