import Cards from "./components/Cards.jsx";
import Score from "./components/Score.jsx";
import { useState } from "react";
function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [pokemonClicked, setPokemonClicked] = useState([]);

  // isloading in father to deny redundant rendering
  const [isLoading, setIsLoading] = useState(true);
  const [gameSessionCounter, setGameSessionCounter] = useState(0);

  function handleCardClick(pokemonName) {
    const includePokemon = pokemonClicked.includes(pokemonName);
    if (!includePokemon) {
      setPokemonClicked([...pokemonClicked, pokemonName]);
      setCurrentScore(currentScore + 1);
    } else {
      setGameSessionCounter(gameSessionCounter + 1);
      setIsLoading(true);
      setCurrentScore(0);
      setPokemonClicked([]);
      if (currentScore > bestScore) {
        setBestScore(currentScore);
      }
    }
  }

  function loadCards() {
    setIsLoading(false);
  }

  return (
    <>
      <Score currentScore={currentScore} bestScore={bestScore} />
      <Cards
        handleCardClick={handleCardClick}
        isLoading={isLoading}
        gameSessionCounter={gameSessionCounter}
        loadCards={loadCards}
      />
    </>
  );
}

export default App;

// The only way is to lift the state up?
// I want the score state variables will be inside, but i need those to be connected to the cards.
// so the only soltuon i know is to life the state up, but it's feel wrong in terms of structure - it feels better for me to store everything connencted to score inside that component/
// is this the only oslition
// components that share state - should lift the state up.

// so this is hte functionallity:
//we had an event handler to handle clicks, and we have a state array that track clicked pokemons.
// if you get clicked, we checked if you are inside that array.
// if no - we add it to score component
// if yes - we update score, and reset the game.
