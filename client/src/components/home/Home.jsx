import PokemonCard from '../pokemonCard/PokemonCard';
import styles from './Home.module.css'
import AllPokemons from '../../hooks/allData';

const Home = () => {
  const pokemons = AllPokemons().pokemons

  return (
    <div>
      <div className={styles.cardContainer}>
        {pokemons.map(pokemon => (
          <PokemonCard key={pokemon.api_id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  )
};

export default Home;