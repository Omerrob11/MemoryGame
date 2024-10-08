import { useState, useEffect } from "react";
import RenderCards from "./RenderCards";

const POKEMON_COUNT = 15;
const TOTAL_POKEMON = 500;

function Cards({ handleCardClick, isLoading, gameSessionCounter, loadCards }) {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    // here we get 15 pokemons, both the name and the url to fetch them.
    // so we map that list, fetch the data with the image, and reutrn a 15 promises of objects.
    // then we resolve it
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
        console.log(data);
        console.log(listOfPokemons);
        // setPokemonList(upadtedPokemonNameAndImageList);
      } catch (error) {
        console.log("error fetching pokemon data");
      }
    }

    // here we start with a unique 15 pokemon id
    //create an array from the unique id, map it, and create a pokemon promise for each id
    // than resolve it and set the pokemon list
    async function fetchRandomPokemons() {
      try {
        // a set pf unique pokemon id
        const uniquePokemonIds = new Set();
        // get 15 unique pokemon id
        while (uniquePokemonIds.size < POKEMON_COUNT) {
          uniquePokemonIds.add(Math.floor(Math.random() * TOTAL_POKEMON) + 1);
        }

        // turn the set to array.
        // generate 15 pokemon as well as url.
        const pokemonPromises = Array.from(uniquePokemonIds).map(async (id) => {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${id}`
          );
          const data = await response.json();

          const pokemonObj = {
            name: data.name,
            imageUrl: data.sprites.front_default,
          };

          // it's an async function, we return a promise.
          return pokemonObj;
        });

        // we return a list of promises, so we resolved them and get the pokemons
        const pokemonList = await Promise.all(pokemonPromises);
        setPokemonList(pokemonList);

        // set is loading to false, to load the cards
        loadCards();
      } catch (error) {
        console.error("error fetchjing stuff", error);
      }
    }

    fetchRandomPokemons();
  }, [gameSessionCounter]);

  // set state with async inside useEffect
  // do we setState before the useEffect finish, or after?

  // change to isloading instead of test
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <RenderCards pokemonList={pokemonList} handleCardClick={handleCardClick} />
  );
}

export default Cards;
