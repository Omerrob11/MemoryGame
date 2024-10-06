import { useState, useEffect } from "react";
import RenderCards from "./RenderCards";

function Cards() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    async function lol() {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=15"
        );
        const data = await response.json();
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

        const upadtedPokemonNameAndImageList = await Promise.all(
          pokemonsNameAndImageList
        );
        setPokemonList(upadtedPokemonNameAndImageList);
      } catch (error) {
        console.log("error fetching pokemon data");
      }
    }

    lol();
  }, []);

  return <RenderCards pokemonList={pokemonList} />;
}

export default Cards;
