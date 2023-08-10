import PokemonCard from '../pokemonCard/PokemonCard';
import styles from './Home.module.css'
import SearchBar from '../searchBar/SearchBar';
import { useSelector } from 'react-redux';
import AllData from '../../hooks/allData';

const Home = () => {
  const {pokemons} = AllData()
  const pokemonByName = useSelector((state) => state.pokemonByName)

  return (
    <div>
      <SearchBar />
      <div className={styles.cardContainer}>
        {pokemonByName ? pokemonByName.map(pokemon => (
      <PokemonCard key={pokemonByName.api_id} pokemon={pokemon} />
    )) : pokemons.map(pokemon => (
      <PokemonCard key={pokemon.api_id} pokemon={pokemon} />
    ))}
      </div>
    </div>
  )
};

export default Home;